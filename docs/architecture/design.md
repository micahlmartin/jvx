# JVX Design Specification

## Overview
A React-based interactive JSON visualization tool that represents JSON data as an editable graph of connected nodes. The application provides an intuitive interface for viewing, editing, and understanding complex JSON structures through a visual graph representation.

## Visual Design Specification

### Design System
Our design system is implemented through Tailwind CSS with custom theme configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#1E1E2E',
        'node-bg': 'rgba(255,255,255,0.05)',
        'node-border': 'rgba(255,255,255,0.1)',
        'text-primary': '#E4E4E7',
        'text-property': '#94A3B8',
        'text-value': '#38BDF8',
        'edge-stroke': 'rgba(148,163,184,0.5)',
        grid: 'rgba(255,255,255,0.05)'
      }
    }
  }
}
```

### Typography
- Primary Font: System UI (-apple-system, BlinkMacSystemFont, etc.)
- Monospace Font: 'JetBrains Mono' for JSON values
- Font Sizes (Tailwind classes):
  - Property Names: `text-sm` (14px)
  - Values: `text-sm` (14px)
  - Controls: `text-xs` (12px)

### Component Styling

#### Layout
- Direction: Left-to-right hierarchical layout using Tailwind's flex and grid utilities
- Column-based positioning with fixed gaps using `gap-` utilities
- Structured, deterministic positioning
- Nodes aligned in columns based on depth
- Smart vertical spacing to prevent overlaps
- Layout Constants (defined in Tailwind theme):
  - Column Gap: `gap-20` (80px)
  - Vertical Spacing: `gap-10` (40px)
  - Column Padding: `p-12` (50px)
  - Top Padding: `pt-10` (40px)

#### Nodes
- Base Component Structure:
  - BaseNode: Core node functionality with Tailwind styling
  - NodeHandle: Connection point management
  - PropertyRow: Individual property display
- Node Types:
  - ObjectNode: Complex object visualization
  - ArrayNode: Array structure visualization
  - ValueNode: Primitive value display
- Styling (Tailwind classes):
  - Border Radius: `rounded-lg` (8px)
  - Background: Glass-morphism effect
    - Semi-transparent background (`bg-node-bg`)
    - Backdrop filter: `backdrop-blur-md`
    - Border: `border border-node-border`
  - Shadow: `shadow-lg`
  - Dynamic width based on content (min-w-[200px] max-w-[400px])
  - Dynamic height based on property count

#### Properties Display
- PropertyRow Component:
  - Key name with consistent color (`text-text-property`)
  - Type indicator or value
  - Clear visual hierarchy
- Spacing:
  - Consistent padding between properties (`p-4`)
  - Clear separation between header and properties (`space-y-2`)
  - Aligned key-value pairs using grid

#### Edges (Connections)
- Style: Smoothstep edges with consistent styling
- Connection Points:
  - Start: Right side of parent node
  - End: Left side of child node
- Appearance:
  - Stroke: `stroke-edge-stroke`
  - Stroke Width: `stroke-2`
  - z-index: `z-[1000]`
  - No target handle for cleaner appearance
- Implementation:
  - Uses React Flow's built-in edge types
  - Optimized for minimal crossings
  - Consistent styling across all connections

### Layout Algorithm

#### Node Depth Calculation
```typescript
interface NodeWithDepth extends Node {
  depth?: number;
}

const calculateNodeDepths = (nodes: Node[], edges: Edge[]): Map<string, number> => {
  const depths = new Map<string, number>();
  const parentMap = new Map<string, string>();
  
  // Build parent map
  edges.forEach(edge => {
    parentMap.set(edge.target, edge.source);
  });
  
  // Find root nodes (nodes with no parents)
  const rootNodes = nodes.filter(node => !parentMap.has(node.id));
  
  // Recursive function to set depths
  const setDepth = (nodeId: string, depth: number) => {
    depths.set(nodeId, depth);
    edges
      .filter(edge => edge.source === nodeId)
      .forEach(edge => {
        setDepth(edge.target, depth + 1);
      });
  };
  
  rootNodes.forEach(node => setDepth(node.id, 0));
  return depths;
};
```

#### Node Positioning
```typescript
interface LayoutConfig {
  nodeWidth: number;      // Dynamic width (200-400px)
  nodeHeight: number;     // Dynamic based on content
  columnGap: number;      // 80px between columns
  verticalSpacing: number;// 40px between nodes
  columnPadding: number;  // 50px padding per column
  topPadding: number;     // 40px top padding
}

interface NodePosition {
  x: number;             // Column-based X position
  y: number;             // Calculated Y position
  depth: number;         // Hierarchical depth
  index: number;         // Sibling index
}
```

### Node Component Structure
```typescript
interface NodeHeader {
  type: 'object' | 'array' | 'value';
  label: string;
}

interface NodeProperty {
  key: string;
  type: string;
  value?: any;
}

interface NodeData {
  header: NodeHeader;
  properties: NodeProperty[];
  width?: number;
  height?: number;
  depth?: number;
}
```

## Component Architecture

### Core Components

1. **JsonEditor**
   - Professional code editing experience using Monaco Editor
   - Core Features:
     - Line numbers and syntax highlighting
     - Code folding and bracket matching
     - Auto-formatting with preservation of cursor position
     - Multi-cursor editing
     - Search and replace
     - Error diagnostics with inline markers
     - Real-time validation with debounced updates (300ms)
     - Custom VS Code-like dark theme
     - Panel resizing with size persistence
     - Empty state handling with placeholder text
   - State Management:
     - Document content synchronization
     - Error state tracking
     - Theme synchronization
     - Panel size persistence
     - Cursor position preservation
   - Editor Configuration:
     - Font: JetBrains Mono
     - Font size: 14px
     - Line height: 1.5
     - Letter spacing: 0.5px
     - Minimap disabled
     - Custom scrollbar settings
     - Automatic layout adjustments
   - Validation Features:
     - Real-time JSON syntax checking
     - Error location identification
     - Inline error markers
     - Status bar error display
     - Error message tooltips
   - Performance Optimizations:
     - Debounced validation
     - Efficient state updates
     - Dynamic loading with SSR support
     - Memory leak prevention
   - Integration:
     - Graph visualization sync
     - Theme system integration
     - Tab system integration
     - Panel resize system

2. **GraphCanvas**
   - Main container for React Flow
   - Handles zoom, pan, and grid functionality
   - Manages node and edge state
   - Implements sophisticated layout algorithm
   - Features:
     - Column-based layout
     - Smart node positioning
     - Overlap prevention
     - Parent-child alignment
     - Dynamic sizing

3. **Node Components**
   - BaseNode: Core node functionality
     - Common styling and behavior
     - Connection point management
     - Property rendering
   - ObjectNode: Complex object visualization
     - Property list display
     - Nested structure handling
   - ArrayNode: Array visualization
     - Index-based display
     - Array-specific controls
   - ValueNode: Primitive value display
     - Simple value rendering
     - Direct editing support

4. **Support Components**
   - NodeHandle: Connection point management
     - Visual indicators
     - Interaction handling
   - PropertyRow: Property display
     - Key-value formatting
     - Type indicators
     - Edit controls

### Component Hierarchy
```
App
├── GraphCanvas
│   ├── Background
│   ├── BaseNode
│   │   ├── NodeHandle
│   │   └── PropertyRow
│   ├── ObjectNode
│   ├── ArrayNode
│   ├── ValueNode
│   └── Controls
└── JsonEditor
```

## Technical Implementation

### Core Technologies
- React 18+
- TypeScript 5+
- React Flow
- Tailwind CSS
- Monaco Editor

### Key Features Implementation

#### Node Layout
```typescript
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  // Calculate node dimensions
  const nodeWidths = new Map<string, number>();
  const nodeHeights = new Map<string, number>();
  
  // Calculate depths and positions
  const depths = calculateNodeDepths(nodes, edges);
  
  // Group nodes by depth
  const nodesByDepth = new Map<number, Node[]>();
  
  // Position nodes with overlap prevention
  // ... (detailed implementation in GraphCanvas.tsx)
};
```

#### Edge Styling
```typescript
const edgeDefaults = {
  type: 'smoothstep',
  animated: false,
  style: {
    stroke: 'var(--edge-stroke)',
    strokeWidth: 2
  },
  zIndex: 1000,
  targetHandle: null
};
```

## Performance Considerations

### Node Rendering
- Implement virtualization for large JSON structures
- Use React.memo for node components
- Optimize re-renders with useMemo and useCallback
- Efficient node dimension calculations
- Smart layout caching

### Interaction Handling
- Debounce drag events
- Throttle zoom/pan operations
- Batch state updates
- Efficient parent-child relationship tracking

## Accessibility

### Focus Management
- Keyboard navigation between nodes
- ARIA labels for interactive elements
- Focus indicators for active elements
- Screen reader support for node content

### Color Contrast
- Minimum contrast ratio: 4.5:1
- Visual indicators beyond color
- High contrast mode support
- Clear visual hierarchy

## Future Considerations

### Planned Features
- JSON schema validation
- Export functionality
- Layout algorithms
- Undo/Redo functionality
- Search/Filter capabilities

### Potential Enhancements
- Collaborative editing
- Custom themes
- Node templates
- Advanced filtering
- Performance optimizations for large datasets

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components
- Implement proper error boundaries
- Maintain consistent naming conventions

### Testing Strategy
- Unit tests for components
- Integration tests for node interactions
- Visual regression testing
- Performance benchmarking

### Documentation
- Maintain component documentation
- Update design decisions
- Document API interfaces
- Keep styling guide updated 