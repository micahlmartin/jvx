# Toolbar Implementation Design Document

## Overview
This document outlines the design and implementation plan for adding a comprehensive toolbar system to the editor interface. The toolbar will provide navigation controls, document management, and extensible menu options.

## Core Requirements
1. Collapsible sidebar control
2. Multi-document management with tabs
3. Extensible menu system
4. Responsive and accessible design

## Technical Architecture

### Component Structure
The project will follow this component organization:

- components/
  - toolbar/
    - Toolbar.tsx (Main toolbar container)
    - SidebarToggle.tsx (Sidebar visibility control)
    - menus/
      - MenuBar.tsx (Container for all menus)
      - FileMenu.tsx (File operations menu)
      - ViewMenu.tsx (View controls menu)
  - tabs/
    - TabBar.tsx (Container for document tabs)
    - Tab.tsx (Individual tab component)
    - TabContext.tsx (Tab state management)

### State Management

Sidebar State Interface:
- isOpen: boolean
- width: number
- lastWidth: number

Document State Interface:
```typescript
interface Document {
  id: string;
  name: string;
  content: string;
  isDirty: boolean;
  type: string;
  path?: string;
}

interface DocumentState {
  documents: Document[];
  activeDocument: string | null;
}
```

Document Management Features:
- Real-time content synchronization
  - Debounced validation (300ms)
  - Error highlighting with line numbers
  - Format preservation
- Tab state persistence
  - Document content
  - Dirty state tracking
  - Active document selection
- Editor state management
  - Theme synchronization
  - Panel size persistence
  - Cursor position preservation
  - Error marker management

JSON Editor State Features:
- Real-time validation
  - JSON syntax checking
  - Error location identification
  - Inline error markers
- Content synchronization
  - Debounced updates
  - Graph visualization sync
  - Tab content sync
- Editor preferences
  - Font settings (JetBrains Mono)
  - Line numbers
  - Syntax highlighting
  - Theme integration
  - Scroll behavior
  - Cursor settings

### Key Features

1. Sidebar Toggle
- Toggle button in toolbar
- Keyboard shortcut (Ctrl/Cmd + B)
- Animated transition
- Persisted state

2. Document Tabs
- Draggable/reorderable
- Close button
- Modified indicator
- Overflow handling
- Context menu
- Dynamic root title syncing with active tab
  - Update document title in browser tab
  - Update root object title in editor
  - Show modified indicator (*) when applicable
  - Format: "{filename} - Editor"

3. Menu System
- File operations
- View controls
- Keyboard shortcuts
- Extensible structure

## Implementation Phases

### Phase 1: Core Structure (1-2 days)
- [ ] Create basic toolbar layout
- [ ] Implement sidebar toggle
- [ ] Set up state management
- [ ] Add keyboard shortcuts

### Phase 2: Tab System (2-3 days)
- [ ] Implement tab bar
- [ ] Add tab creation/deletion
- [ ] Implement tab switching
- [ ] Add drag-and-drop reordering

### Phase 3: Menu System (2-3 days)
- [ ] Create menu bar structure
- [ ] Implement File menu
- [ ] Implement View menu
- [ ] Add keyboard shortcuts

### Phase 4: Polish (1-2 days)
- [ ] Add animations
- [ ] Implement persistence
- [ ] Add error handling
- [ ] Accessibility improvements

## Technical Specifications

### Styling
- Tailwind CSS for UI components
- Dark/light theme support
- Responsive breakpoints

### State Management
- React Context for document state
- Local storage for persistence
- Custom hooks for state access

### Accessibility Requirements
- ARIA labels for all interactive elements
- Full keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- Keyboard shortcuts with clear indicators

### Browser Support
- Modern browsers (last 2 versions)
- Mobile-responsive design
- Touch-friendly interactions

### Document Title Management
- Root object title updates:
  - Reflects currently active document name
  - Updates immediately on tab switch
  - Shows file path when available
  - Indicates unsaved changes
  - Format examples:
    - "example.json - Editor"
    - "untitled-1 - Editor"
    - "* modified-file.json - Editor"
- Browser tab title syncs with root title
- State persists across page reloads

### Editor Features
- Professional editing experience:
  - Syntax highlighting
  - Error diagnostics
  - Line numbers
  - Code folding
  - Bracket matching
  - Auto-formatting
  - Multi-cursor support
- Real-time validation:
  - JSON syntax checking
  - Error location highlighting
  - Inline error markers
  - Status bar indicators
- Theme support:
  - Light/dark mode
  - Custom VS Code-like theme
  - Syntax highlighting colors
  - UI element theming
- Performance optimizations:
  - Debounced validation
  - Efficient state updates
  - Smooth transitions
  - Memory management

### Integration Features
- Graph synchronization:
  - Real-time updates
  - Layout preservation
  - Node positioning
  - Edge management
- Panel management:
  - Resizable editor
  - Size persistence
  - Collapse/expand
  - Min/max constraints
- Theme integration:
  - Consistent styling
  - Smooth transitions
  - Context awareness
  - Component theming

## Testing Strategy

### Unit Tests
- Component rendering
- State management
- User interactions
- Keyboard shortcuts

### Integration Tests
- Tab system workflow
- Menu interactions
- Document management
- State persistence

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- ARIA compliance

## Performance Considerations
- Lazy loading of menu components
- Efficient tab rendering
- Debounced state updates
- Memoized components

## Dependencies
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- React DnD (for drag and drop)
- React Icons

## Success Metrics

### Performance
- No noticeable lag when switching tabs
- Smooth animations
- < 100ms response time for all interactions

### Accessibility
- 100% keyboard navigable
- WCAG 2.1 AA compliant
- Perfect Lighthouse accessibility score

### Reliability
- State persistence across page reloads
- No data loss during tab management
- Graceful error handling

## Future Enhancements

### Tab Groups
- Group related documents
- Collapsible groups
- Color coding

### Advanced Features
- Split view support
- Custom menu items
- Search in tabs
- Recent files list
- Session restoration

## Maintenance Guidelines

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- JSDoc documentation

### Testing Requirements
- Unit test coverage > 80%
- E2E tests for critical paths
- Accessibility testing
- Cross-browser testing

### Performance Monitoring
- Regular performance audits
- Memory leak checks
- Bundle size monitoring

### Documentation Requirements
- Props interface documentation
- Usage examples
- Edge cases
- Troubleshooting guides