/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#1E1E2E',
        },
        toolbar: {
          bg: {
            DEFAULT: '#f3f3f3',
            dark: '#1e1e1e'
          },
          hover: {
            DEFAULT: '#e5e5e5',
            dark: '#2d2d2d'
          },
          active: {
            DEFAULT: '#ffffff',
            dark: '#323232'
          },
          border: {
            DEFAULT: '#e7e7e7',
            dark: '#3c3c3c'
          },
          text: {
            DEFAULT: '#616161',
            dark: '#ffffff'
          },
          highlight: {
            DEFAULT: '#0098ff',
            dark: '#007fd4'
          }
        },
        editor: {
          bg: {
            DEFAULT: '#FFFFFF',
            dark: '#1E1E2E',
            highlight: {
              DEFAULT: 'rgba(0, 0, 0, 0.05)',
              dark: 'rgba(255, 255, 255, 0.1)'
            },
            selection: {
              DEFAULT: 'rgba(0, 0, 0, 0.1)',
              dark: 'rgba(255, 255, 255, 0.2)',
              inactive: {
                DEFAULT: 'rgba(0, 0, 0, 0.05)',
                dark: 'rgba(255, 255, 255, 0.1)'
              }
            }
          },
          text: {
            DEFAULT: '#1A1A1A',
            dark: '#E4E4E7',
            muted: {
              DEFAULT: '#475569',
              dark: '#94A3B8'
            },
            placeholder: {
              DEFAULT: 'rgba(0, 0, 0, 0.3)',
              dark: 'rgba(255, 255, 255, 0.3)'
            }
          },
          gutter: {
            bg: {
              DEFAULT: '#F8F9FA',
              dark: '#1E1E2E'
            },
            modified: '#3B82F6',
            added: '#10B981',
            deleted: '#EF4444'
          },
          error: {
            text: '#EF4444',
            bg: 'rgba(239, 68, 68, 0.1)'
          },
          bracket: {
            match: {
              bg: {
                DEFAULT: 'rgba(0, 0, 0, 0.1)',
                dark: 'rgba(255, 255, 255, 0.2)'
              },
              border: {
                DEFAULT: 'rgba(0, 0, 0, 0.2)',
                dark: 'rgba(255, 255, 255, 0.4)'
              }
            }
          }
        },
        'node-bg': {
          DEFAULT: 'rgba(0, 0, 0, 0.05)',
          dark: 'rgba(255, 255, 255, 0.05)',
        },
        'node-border': {
          DEFAULT: 'rgba(0, 0, 0, 0.1)',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
        'text-primary': {
          DEFAULT: '#1A1A1A',
          dark: '#E4E4E7',
        },
        'text-property': {
          DEFAULT: '#475569',
          dark: '#94A3B8',
        },
        'text-value': {
          DEFAULT: '#0284C7',
          dark: '#38BDF8',
        },
        'edge-stroke': {
          DEFAULT: 'rgba(71, 85, 105, 0.5)',
          dark: 'rgba(148, 163, 184, 0.5)',
        },
        grid: {
          DEFAULT: 'rgba(0, 0, 0, 0.05)',
          dark: 'rgba(255, 255, 255, 0.05)',
        },
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
        'menu': '13px',
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