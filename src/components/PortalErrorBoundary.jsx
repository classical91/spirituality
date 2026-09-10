// Recovery screen for a portal that fails to render.
//
// Every portal is a lazy import, so the most likely failure here is not a bug
// in the portal at all: it is a chunk that could not be fetched. A dropped
// connection does it, and so does a deploy — the loaded index.html points at
// hashed chunk filenames, and once a new build replaces them the old names are
// gone. Without a boundary, that rejection unmounts the whole app and leaves a
// blank page with no way out but a manual refresh.
//
// Reload is the primary action because it is the one that fixes the stale-chunk
// case: index.html is served no-store (see staticHeaders in server.mjs), so a
// reload picks up the current build's filenames. Home is the fallback for a
// portal that is genuinely broken, since the rest of the app still works.
//
// Error boundaries have no hook equivalent, so this stays a class component.
import { Component } from 'react';

const shell = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: 24,
  background: '#07090f',
  color: '#d8ceff',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
};

const card = {
  width: 'min(100%, 30rem)',
  padding: '1.5rem',
  border: '1px solid rgba(206, 183, 255, 0.28)',
  borderRadius: '1.25rem',
  background: 'rgba(30, 34, 45, 0.92)',
  boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.26)',
  textAlign: 'center',
};

const button = {
  padding: '0.75rem 1.25rem',
  borderRadius: 999,
  border: '1px solid rgba(103, 232, 249, 0.5)',
  background: 'transparent',
  color: '#67e8f9',
  font: 'inherit',
  fontWeight: 800,
  cursor: 'pointer',
};

const secondaryButton = {
  ...button,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  color: '#d3cadf',
};

export default class PortalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // No observability platform here on purpose; the console is where a visitor
    // reporting this would be asked to look.
    console.error('A portal failed to load:', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div style={shell} role="alert">
        <div style={card}>
          <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 12 }} aria-hidden="true">
            ✦
          </div>
          <h1 style={{ margin: '0 0 0.65rem', fontSize: '1.25rem' }}>This page didn&apos;t load</h1>
          <p style={{ margin: 0, color: '#d3cadf', fontSize: '1rem', lineHeight: 1.6 }}>
            Something went wrong opening it. Reloading usually fixes this, especially if the app was
            updated while you had it open.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              marginTop: '1.25rem',
            }}
          >
            <button type="button" style={button} onClick={() => window.location.reload()}>
              Reload
            </button>
            {this.props.onGoHome && (
              <button type="button" style={secondaryButton} onClick={this.props.onGoHome}>
                Go home
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
