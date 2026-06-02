// Central accent palette for InnerAtlas sections. Each section glows in its own
// colour while sharing one immersive dark frame. `hex` drives text/borders;
// `rgb` feeds the rgba() gradients and glows in innerAtlasTheme.css.
export const IA_ACCENTS = {
  hub:                   { hex: '#86efac', rgb: '134, 239, 172' },
  'nervous-system':      { hex: '#7ab979', rgb: '122, 185, 121' },
  'psychology':          { hex: '#67e8f9', rgb: '103, 232, 249' },
  'mood-neurochemistry': { hex: '#a78bfa', rgb: '167, 139, 250' },
  'lifestyle':           { hex: '#fbbf24', rgb: '251, 191, 36'  },
  'colorpsychology':     { hex: '#22d3ee', rgb: '34, 211, 238'  },
  'regulation':          { hex: '#34d399', rgb: '52, 211, 153'  },
  'emotions':            { hex: '#f472b6', rgb: '244, 114, 182' },
};

// Inline style object that sets the accent CSS variables for a given section.
export function accentVars(id) {
  const a = IA_ACCENTS[id] || IA_ACCENTS.hub;
  return { '--ia-accent': a.hex, '--ia-accent-rgb': a.rgb };
}
