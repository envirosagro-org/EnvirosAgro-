export const DPMO_DATA = [
    { week: 'W1', dpmo: 1240, sigma: 4.8 },
    { week: 'W2', dpmo: 980, sigma: 4.9 },
    { week: 'W3', dpmo: 3400, sigma: 4.2 },
    { week: 'W4', dpmo: 450, sigma: 5.4 },
    { week: 'W5', dpmo: 12, sigma: 6.2 },
  ];
  
  export const FISHBONE_CATEGORIES = [
    {
      label: 'Personnel',
      causes: ['Configuration oversight', 'Deployment sync lag', 'Manual build steps'],
    },
    {
      label: 'Runtime',
      causes: ['Browser ESM limitations', 'Node-only dependency leak', 'Memory pressure'],
    },
    {
      label: 'Method',
      causes: ['Vite build mismatch', 'Importmap pollution', 'Race condition'],
    },
    {
      label: 'Material',
      causes: ['Incompatible npm packages', 'Corrupt cache', 'Manifest errors'],
    },
  ];
  
  export const whys = [
    { q: "Problem: The app fails to load with a script error.", a: "The browser encountered an 'Uncaught TypeError' on entry." },
    { q: "Why did the TypeError occur?", a: "The module loader couldn't resolve 'vite' and '@vitejs/plugin-react' exports." },
    { q: "Why were these modules being requested?", a: "They were erroneously included in the index.html <script type='importmap'>." },
    { q: "Why were development tools in the production importmap?", a: "The build configuration didn't strictly separate Node-only dev dependencies from browser-native ESM." },
    { q: "Root Cause: Why was there no separation?", a: "Missing automated validation node in the transmission gateway to strip non-standard browser modules." }
  ];