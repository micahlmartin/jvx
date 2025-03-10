/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1E1E2E',
        'node-bg': 'rgba(255, 255, 255, 0.05)',
        'node-border': '#FFFFFF',
        'text-primary': '#E4E4E7',
        'text-property': '#94A3B8',
        'text-value': '#38BDF8',
        'edge-stroke': '#FFFFFF',
        grid: 'rgba(255, 255, 255, 0.05)',
        // Node header colors
        'header-level0': '#2D3748',
        'header-level1': '#553C9A',
        'header-level2': '#2A4365',
        'header-level3': '#285E61',
        'header-level4': '#702459',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'type': '12px',
        'label': '14px',
        'property': '13px',
      },
      spacing: {
        'node-padding': '12px',
        'property-gap': '6px',
        'header-gap': '8px',
      },
      borderRadius: {
        'node': '8px',
        'badge': '4px',
      },
      backdropBlur: {
        'node': '12px',
      },
      boxShadow: {
        'node': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        'node': '0.2s',
      },
      zIndex: {
        'node-base': '1',
        'handles': '10',
        'tooltip': '100',
      },
    },
  },
  plugins: [],
} 