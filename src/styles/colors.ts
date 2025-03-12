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
  },
  toolbar: {
    bg: {
      DEFAULT: '#f3f3f3',
      dark: '#1f1f1f'
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
      dark: '#2d2d2d'
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
  sidebar: {
    bg: {
      DEFAULT: '#f8f8f8',
      dark: '#252526'
    }
  },
  background: {
    DEFAULT: '#FFFFFF',
    dark: '#1E1E2E',
  },
  node: {
    types: {
      root: {
        bg: 'rgba(82, 82, 91, 0.25)',
        text: 'rgba(161, 161, 170, 1)'
      },
      customer: {
        bg: 'rgba(59, 130, 246, 0.2)',
        text: 'rgba(96, 165, 250, 1)'
      },
      items: {
        bg: 'rgba(147, 51, 234, 0.2)',
        text: 'rgba(167, 139, 250, 1)'
      },
      shipping: {
        bg: 'rgba(236, 72, 153, 0.2)',
        text: 'rgba(236, 72, 153, 1)'
      },
      payment: {
        bg: 'rgba(16, 185, 129, 0.2)',
        text: 'rgba(52, 211, 153, 1)'
      },
      address: {
        bg: 'rgba(245, 158, 11, 0.2)',
        text: 'rgba(251, 191, 36, 1)'
      }
    },
    values: {
      string: '#38BDF8',
      number: '#EC4899',
      boolean: {
        true: '#4ADE80',
        false: '#F87171'
      },
      property: '#94A3B8'
    },
    border: {
      DEFAULT: 'rgba(255, 255, 255, 0.1)'
    }
  }
} as const; 