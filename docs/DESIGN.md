# JSON Graph Visualizer Design Specification

## Overview
A React-based interactive JSON visualization tool that represents JSON data as an editable graph of connected nodes. The application provides an intuitive interface for viewing, editing, and understanding complex JSON structures through a visual graph representation.

## Visual Design Specification

### Color Palette
```css
--background: #1E1E2E;           /* Main background color */
--node-bg: rgba(255,255,255,0.05); /* Node background with transparency */
--node-border: rgba(255,255,255,0.1); /* Node border color */
--text-primary: #E4E4E7;         /* Primary text color */
--text-property: #94A3B8;        /* Property name text color */
--text-value: #38BDF8;           /* Property value text color */
--edge-stroke: rgba(148,163,184,0.5); /* Connection line color */
--grid: rgba(255,255,255,0.05);  /* Background grid color */
```

### Typography
- Primary Font: System UI (-apple-system, BlinkMacSystemFont, etc.)
- Monospace Font: 'JetBrains Mono' for JSON values
- Font Sizes:
  - Property Names: 0.875rem (14px)
  - Values: 0.875rem (14px)
  - Controls: 0.75rem (12px)

### Component Styling

#### Layout
- Direction: Left-to-right hierarchical layout
- Fixed node positions (no user dragging)
- Structured, deterministic positioning
- Nodes aligned in columns based on depth
- Consistent spacing between levels and siblings

#### Nodes
- Header Section:
  - Type indicator (Object, Array, Value)
  - Label/key name
  - Visual type indicator
- Content Section:
  - Property list with key-value pairs
  - Consistent property spacing
  - Property alignment and indentation
- Styling:
  - Border Radius: 8px
  - Background: Glass-morphism effect
    - Semi-transparent background (var(--node-bg))
    - Backdrop filter: blur(12px)
    - Border: 1px solid var(--node-border)
  - Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
  - Fixed width for consistency
  - Dynamic height based on content

#### Properties Display
- Property Row:
  - Key name with consistent color (var(--text-property))
  - Type indicator or value
  - Clear visual hierarchy
- Spacing:
  - Consistent padding between properties
  - Clear separation between header and properties
  - Aligned key-value pairs

#### Edges (Connections)
- Style: Orthogonal edges with curved corners
- Connection Points:
  - Start: Right side of parent node
  - End: Left side of child node
- Appearance:
  - Stroke: var(--edge-stroke)
  - Stroke Width: 2px
  - Corner Radius: 8px
  - Path: Smart orthogonal routing with minimal crossings
- Labels:
  - Property name on edge
  - Consistent positioning
  - Clear readability

### Layout Algorithm
```typescript
interface LayoutConfig {
  nodeWidth: number;      // Fixed width for all nodes
  nodeHeight: number;     // Minimum height, grows with content
  levelSeparation: number;// Horizontal space between levels
  nodeSeparation: number; // Vertical space between siblings
  edgeRadius: number;     // Corner radius for edge bends
}

interface NodePosition {
  x: number;             // X coordinate (level-based)
  y: number;             // Y coordinate (sibling-based)
  level: number;         // Depth in the hierarchy
  index: number;         // Index among siblings
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
}
```

## Component Architecture

### Core Components

1. **JsonEditor**
   - Professional code editing experience using Monaco Editor
   - Features:
     - Line numbers and syntax highlighting
     - Code folding and bracket matching
     - Auto-formatting
     - Multi-cursor editing
     - Search and replace
     - Error diagnostics with inline markers
   - Real-time validation with error highlighting
   - JSON schema validation support
   - Customized dark theme to match application
   - Performance optimized for large JSON files
   - Keyboard shortcuts for common operations

2. **GraphCanvas**
   - Main container for React Flow
   - Handles zoom, pan, and grid functionality
   - Manages node and edge state

3. **CustomNode**
   - Base node component for JSON visualization
   - Variants:
     - ObjectNode
     - ArrayNode
     - ValueNode
   - Properties:
     - Type indicator
     - Content display
     - Edit controls
     - Connection handles

4. **CustomEdge**
   - Represents connections between nodes
   - Properties:
     - Label display
     - Animation state
     - Interactive features

5. **ControlPanel**
   - Zoom controls
   - Fullscreen toggle
   - View options
   - Layout controls

### Component Hierarchy
```
App
├── GraphCanvas
│   ├── Background
│   ├── CustomNode[]
│   │   ├── NodeContent
│   │   └── HandlePoints
│   ├── CustomEdge[]
│   └── Controls
└── ControlPanel
```

## Technical Implementation

### Core Technologies
- React 18+
- TypeScript 5+
- React Flow
- Tailwind CSS
- CSS-in-JS (styled-components/emotion)

### Key Features Implementation

#### Node Dragging
```typescript
interface NodeData {
  type: 'object' | 'array' | 'value';
  content: any;
  editable: boolean;
}

const nodeDefaults = {
  draggable: true,
  connectable: true,
  selectable: true,
}
```

#### Glass-morphism Effect
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

#### Edge Styling
```typescript
const edgeDefaults = {
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: 'rgba(148, 163, 184, 0.5)',
    strokeWidth: 2,
  },
}
```

## Performance Considerations

### Node Rendering
- Implement virtualization for large JSON structures
- Use React.memo for node components
- Optimize re-renders with useMemo and useCallback

### Interaction Handling
- Debounce drag events
- Throttle zoom/pan operations
- Batch state updates

## Accessibility

### Focus Management
- Keyboard navigation between nodes
- ARIA labels for interactive elements
- Focus indicators for active elements

### Color Contrast
- Minimum contrast ratio: 4.5:1
- Visual indicators beyond color
- High contrast mode support

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