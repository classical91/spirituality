// Sacred Pathways server.
//
// This used to be `serve dist -s` and nothing else — a static SPA with no
// process of its own. It has one now for a single reason: Main Hub's Daily
// Dashboard shows today's prayer and today's reading, and this app owns both
// rotations. The alternative was a second rotation in a second repository,
// which would have drifted from this one the first time a prayer was added.
//
// So: the same static serving as before, with SPA fallback, plus a few
// read-only endpoints. Nothing here writes or authenticates, and the daily
// rotations are the same ones the home screen shows every visitor.
//
// Today's Cosmic Theme is the one that is not public in that way. It is a
// reading of today's sky against one particular natal chart, so it answers with
// something only when a chart has been set — in this service's environment,
// never in this repository, which anyone can read.

import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import handler from 'serve-handler';
import { REFRESHING_AFFIRMATIONS } from './src/lib/affirmations.js';
import { resolveDaily } from './src/lib/daily.js';
import { parseNatalChart, resolveCosmicTheme } from './src/lib/cosmicTheme.js';
import { portalPath } from './src/lib/portalPath.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist');
const port = Number(process.env.PORT || 3000);

// Caching policy for the static build, and the only copy of it. Vite fingerprints
// everything under /assets, so those files can be cached forever — their names
// change when their contents do. index.html is what points at the current
// fingerprints, so it must never be cached: a stale copy sends visitors to
// asset URLs that no longer exist after a deploy.
//
// This used to live in public/serve.json, which read like configuration but was
// not: serve-handler only applies headers passed to it programmatically, and
// nothing passed them. The file was copied into the build and ignored, so every
// response fell back to serve-handler's defaults.
const staticHeaders = [
  {
    source: '**/*.html',
    headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
  },
  {
    source: 'assets/**',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
];

/**
 * The natal chart the Cosmic Theme is read against.
 *
 * From the environment because this repository is public and a birth chart is
 * not: committing one here would publish it, and publish it in the history even
 * if it were taken out again. Read once at boot rather than per request — it is
 * a constant of the deployment, and a chart that changed between two requests
 * on the same day would make the card disagree with itself.
 *
 * Unset is a normal state, not a failure. The endpoint still answers; it simply
 * has no theme, and says which variable would give it one.
 */
const { chart: natalChart, error: natalChartError } = parseNatalChart(process.env.NATAL_CHART);

const sendJson = (response, status, body) => {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Cache-Control': 'no-store',
  });
  response.end(payload);
};

/**
 * A calendar day the caller named, or null if it is not one. Built from the
 * year/month/day parts rather than Date.parse so it means the same day
 * whatever timezone this process happens to be running in.
 */
const parseRequestedDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value ?? '').trim());
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  // Rejects 2026-02-31 and friends, which Date happily rolls forward.
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
};

const handleDaily = (request, response, url) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return sendJson(response, 405, {
      error: 'method_not_allowed',
      message: 'Only GET is supported for the daily rotation.',
    });
  }

  // The caller's calendar day, not this container's. Main Hub asks in Vancouver
  // time; without this the prayer would turn over at whatever hour Railway
  // thinks it is.
  const requested = url.searchParams.get('date');
  const date = requested === null ? new Date() : parseRequestedDate(requested);

  if (!date) {
    return sendJson(response, 400, {
      error: 'invalid_date',
      message: 'date must be a real calendar day in YYYY-MM-DD form.',
    });
  }

  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return sendJson(response, 200, {
    date: `${date.getFullYear()}-${month}-${day}`,
    ...resolveDaily(date),
  });
};

/**
 * Every refreshing affirmation, as the home screen has them.
 *
 * The whole list rather than one pick, because the picking is the feature: the
 * home screen rotates every twelve seconds and shuffles on demand, and a caller
 * that had to ask the server for each new line would be making a request every
 * twelve seconds to do it. These are sixty short strings and they do not change
 * between deploys, so the caller can hold them and do its own rotating.
 *
 * Not part of /api/daily, which answers "what is true about this date". An
 * affirmation is not a property of the day — it is the same list every day.
 */
const handleAffirmations = (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return sendJson(response, 405, {
      error: 'method_not_allowed',
      message: 'Only GET is supported for the affirmations.',
    });
  }

  return sendJson(response, 200, {
    count: REFRESHING_AFFIRMATIONS.length,
    affirmations: REFRESHING_AFFIRMATIONS,
  });
};

/**
 * One theme for the day, read from today's transits against the natal chart.
 *
 * Date-scoped like /api/daily and for the same reason: the caller's calendar day
 * is the caller's, not this container's. Main Hub asks in Vancouver time.
 *
 * The answer always carries the transits it was read from. That line is the
 * difference between a reading and a horoscope, and a caller that shows the
 * theme without it is showing half of what was said.
 */
const handleCosmic = (request, response, url) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return sendJson(response, 405, {
      error: 'method_not_allowed',
      message: 'Only GET is supported for the cosmic theme.',
    });
  }

  const requested = url.searchParams.get('date');
  const date = requested === null ? new Date() : parseRequestedDate(requested);

  if (!date) {
    return sendJson(response, 400, {
      error: 'invalid_date',
      message: 'date must be a real calendar day in YYYY-MM-DD form.',
    });
  }

  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const dateKey = `${date.getFullYear()}-${month}-${day}`;

  // No chart is a setup step, not an outage — so this is a 200 with no theme
  // and a sentence saying what to set, which a card can show as it stands. A
  // 500 here would put a red error on a dashboard over a variable nobody has
  // filled in yet.
  if (!natalChart) {
    return sendJson(response, 200, {
      date: dateKey,
      theme: '',
      message: `No natal chart is set on Sacred Pathways — set NATAL_CHART on this service to read one. (${natalChartError})`,
    });
  }

  const reading = resolveCosmicTheme(natalChart, dateKey);
  if (!reading) {
    return sendJson(response, 200, {
      date: dateKey,
      theme: '',
      message: 'Nothing in the sky is contacting this chart today.',
    });
  }

  return sendJson(response, 200, {
    date: dateKey,
    ...reading,
    // Where the app itself keeps this material: the Natal Chart tab of the
    // Sacred Systems Atlas. Built through portalPath for the same reason the
    // reading's link is — a deep link that drifts from what the app does is a
    // link into a redirect at best.
    path: portalPath('astrology'),
  });
};

const server = createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (url.pathname === '/api/daily') {
    handleDaily(request, response, url);
    return;
  }

  if (url.pathname === '/api/affirmations') {
    handleAffirmations(request, response);
    return;
  }

  if (url.pathname === '/api/cosmic') {
    handleCosmic(request, response, url);
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    sendJson(response, 404, { error: 'not_found', message: 'That API route does not exist.' });
    return;
  }

  // Everything else is the app, exactly as `serve dist -s` served it: real
  // files where they exist, index.html everywhere else so the History API
  // router can take over.
  handler(request, response, {
    public: distPath,
    cleanUrls: false,
    rewrites: [{ source: '**', destination: '/index.html' }],
    headers: staticHeaders,
    // Nothing here is a directory to browse; a missing path is the SPA's to
    // resolve, which the rewrite above already handles.
    directoryListing: false,
  }).catch((error) => {
    console.error('Static request failed:', error);
    if (response.headersSent) {
      response.destroy();
      return;
    }
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Something went wrong.');
  });
});

server.listen(port, () => {
  console.log(`Sacred Pathways listening on port ${port}`);
  if (!natalChart) {
    console.warn(`Sacred Pathways: no NATAL_CHART set (${natalChartError}) — `
      + '/api/cosmic will answer with no theme and say so.');
  }
});
