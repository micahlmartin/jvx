export const colors = {
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
  }
} as const; 