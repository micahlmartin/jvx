export const designSystem = {
  spacing: {
    nodePadding: '12px',
    propertyGap: '6px',
    headerGap: '8px',
  },

  typography: {
    fontMono: "'JetBrains Mono', monospace",
    sizes: {
      type: '12px',
      label: '14px',
      property: '13px',
    },
  },

  borders: {
    node: '1px solid var(--node-border)',
    separator: '1px solid var(--node-border)',
    radius: {
      node: '8px',
      badge: '4px',
    },
  },

  colors: {
    nodeHeaders: {
      level0: { background: '#2D3748', text: '#FFFFFF' },
      level1: { background: '#553C9A', text: '#FFFFFF' },
      level2: { background: '#2A4365', text: '#FFFFFF' },
      level3: { background: '#285E61', text: '#FFFFFF' },
      level4: { background: '#702459', text: '#FFFFFF' },
    },
    values: {
      string: 'var(--text-string)',
      number: 'var(--text-number)',
      boolean: 'var(--text-boolean)',
      default: 'var(--text-value)',
    },
  },

  handles: {
    size: {
      width: '8px',
      height: '8px',
    },
    colors: {
      default: 'var(--handle-color)',
      hover: 'var(--handle-hover-color)',
    },
    positioning: {
      source: {
        right: '0',
        top: '50%',
        transform: 'translate(50%, -50%)',
      },
      target: {
        left: '0',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
    opacity: {
      source: {
        visible: 1,
        hidden: 0,
      },
      target: {
        default: 0,
        connecting: 1,
      },
    },
    transitions: {
      opacity: 'opacity 0.2s ease',
    },
  },

  zIndex: {
    nodeBase: 1,
    handles: 10,
    tooltip: 100,
  },

  effects: {
    nodeBackdrop: 'blur(12px)',
    nodeHoverTransition: 'all 0.2s ease',
  },
} as const;

// Type exports for type safety
export type DesignSystem = typeof designSystem;
export type NodeHeaderLevel = keyof typeof designSystem.colors.nodeHeaders;
export type ValueType = keyof typeof designSystem.colors.values;
