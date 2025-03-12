# Design System Documentation

## Overview
This document outlines the core design principles and specifications for our application's components, with a particular focus on node visualization and interaction elements.

## Handle Components

### Visual Properties
- **Size**: 
  - Width: ${designSystem.handles.size.width}
  - Height: ${designSystem.handles.size.height}
- **Shape**: Circular (border-radius: 50%)
- **Border**: None
- **Colors**:
  - Default: ${designSystem.handles.colors.default}
  - Hover: ${designSystem.handles.colors.hover}

### Positioning
- **Left Handle**:
  - Position: Absolute
  - Left: 0
  - Top: 50%
  - Transform: translate(-50%, -50%)
  
- **Right Handle**:
  - Position: Absolute
  - Right: 0
  - Top: 50%
  - Transform: translate(50%, -50%)

### Visibility Rules
1. **Target Handles**:
   - Default state: Invisible (opacity: 0)
   - When connecting: Visible (opacity: 1)
   - Pointer events: None when invisible, All when visible

2. **Source Handles**:
   - Default state: Visible (opacity: 1)
   - When not visible: Hidden (opacity: 0)
   - Pointer events: All when visible, None when hidden

### Transitions
- Opacity transition: ${designSystem.handles.transitions.opacity}
- Z-index: ${designSystem.zIndex.handles}

## Property Row Component

### Layout
- Display: Grid
- Grid Template: auto 1fr auto
- Alignment: Center
- Gap: 8px
- Minimum Height: 22px

### Separator
- Position: Absolute
- Color: ${designSystem.borders.separator}
- Location:
  - Left: -${designSystem.spacing.nodePadding}
  - Right: -${designSystem.spacing.nodePadding}
  - Bottom: -${parseInt(designSystem.spacing.propertyGap) / 2}px
- Height: 1px
- Visibility: Present on all rows except the last child

## Design Principles

### 1. Visual Hierarchy
- Handles should be visually distinct but not dominate the interface
- Property rows should maintain clear separation while preserving visual flow

### 2. Interaction Design
- Handle visibility should provide clear affordances for connection possibilities
- Property row separators should create clear visual boundaries without creating visual noise

### 3. Consistency
- All measurements should use the design system's spacing units
- Colors should be consistently applied using design system tokens
- Transitions should be smooth and consistent across similar interactions

## Usage Guidelines

### 1. Handle Implementation
- Always use the NodeHandle component for connection points
- Never override the default visibility behavior without explicit justification
- Maintain the positioning system to ensure consistent alignment

### 2. Property Row Implementation
- Always use the PropertyRow component for node properties
- Maintain the separator system for visual clarity
- Respect the grid layout system for consistent alignment

## Accessibility Considerations
- Ensure sufficient color contrast for all interactive elements
- Maintain appropriate hit areas for handle interactions
- Provide clear visual feedback for interactive states

## Node Structure

### Property Rows
- Must maintain consistent separation with borders
- Must use pseudo-element implementation for borders:
```css
&:not(:last-child)::after {
  content: '';
  position: absolute;
  left: -${designSystem.spacing.nodePadding};
  right: -${designSystem.spacing.nodePadding};
  bottom: -${parseInt(designSystem.spacing.propertyGap) / 2}px;
  height: 1px;
  background: ${designSystem.borders.separator};
}
```

### Spacing
- Node padding: ${designSystem.spacing.nodePadding}
- Property gap: ${designSystem.spacing.propertyGap}
- Header gap: ${designSystem.spacing.headerGap}

### Visual Hierarchy
- Node background: var(--node-bg)
- Border: ${designSystem.borders.node}
- Border radius: 8px
- Backdrop filter: blur(12px)

## Typography

### Font Sizes
- Type: ${designSystem.typography.sizes.type}
- Label: ${designSystem.typography.sizes.label}
- Property: ${designSystem.typography.sizes.property}

### Font Families
- Monospace: ${designSystem.typography.fontMono}
- Default system font for general text

## Colors

### Node Headers
- Level 0-4 backgrounds and text colors defined in designSystem.colors.nodeHeaders
- Colors cycle every 5 levels
- Special handling for array items and root nodes

### Property Values
- String: ${designSystem.colors.values.string}
- Number: ${designSystem.colors.values.number}
- Boolean: ${designSystem.colors.values.boolean}
- Default: ${designSystem.colors.values.default}

## Z-Index Hierarchy
- Base Node: ${designSystem.zIndex.nodeBase}
- Handles: ${designSystem.zIndex.handles}

## Transitions
- Handle opacity: ${designSystem.handles.transitions.opacity}
- Node hover effects: 0.2s ease

## Implementation Requirements

### Handle Components
1. Must use design system constants for positioning
2. Must maintain proper opacity settings
3. Must use absolute positioning
4. Must implement proper z-indexing

### Property Row Components
1. Must implement separator borders using pseudo-elements
2. Must maintain consistent spacing
3. Must follow typography guidelines
4. Must implement proper value type colors

### Node Components
1. Must follow visual hierarchy guidelines
2. Must implement proper padding and spacing
3. Must maintain proper z-index stacking
4. Must implement proper backdrop filters

## Testing Requirements
1. Visual regression tests must verify handle positioning
2. Tests must verify proper opacity settings
3. Tests must verify border implementations
4. Tests must verify color implementations

## Accessibility
1. Proper color contrast for all text elements
2. Sufficient touch targets for mobile interaction
3. Proper focus indicators for interactive elements
4. Proper ARIA attributes for interactive elements 