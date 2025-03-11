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
  node: {
    types: {
      root: {
        bg: 'rgba(82, 82, 91, 0.3)',
        text: 'rgba(161, 161, 170, 0.9)'
      },
      customer: {
        bg: 'rgba(59, 130, 246, 0.15)',
        text: 'rgba(96, 165, 250, 0.9)'
      },
      items: {
        bg: 'rgba(147, 51, 234, 0.15)',
        text: 'rgba(167, 139, 250, 0.9)'
      },
      shipping: {
        bg: 'rgba(236, 72, 153, 0.15)',
        text: 'rgba(236, 72, 153, 0.9)'
      },
      payment: {
        bg: 'rgba(16, 185, 129, 0.15)',
        text: 'rgba(52, 211, 153, 0.9)'
      },
      address: {
        bg: 'rgba(245, 158, 11, 0.15)',
        text: 'rgba(251, 191, 36, 0.9)'
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