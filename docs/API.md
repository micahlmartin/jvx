# API Documentation

## Components

### NodeHandle

A component that provides connection points for nodes in a flow diagram.

#### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| type | `'source' \| 'target'` | Yes | - | The type of handle - either a source for outgoing connections or a target for incoming connections |
| position | `Position` | Yes | - | The position of the handle on the node - typically Left for targets and Right for sources |
| isVisible | `boolean` | No | `true` | Whether the handle is visible - only affects source handles as target handles have their own visibility logic |
| id | `string` | No | - | Optional ID for the handle - useful when multiple handles are present on the same node |
| className | `string` | No | - | Optional className for additional styling |

#### Usage

```tsx
// Target handle on the left side of a node
<NodeHandle
  type="target"
  position={Position.Left}
/>

// Source handle on the right side of a node
<NodeHandle
  type="source"
  position={Position.Right}
  isVisible={true}
/>
```

#### Behavior

- Target handles are invisible by default and only show when a connection is being made
- Source handles are visible by default but can be hidden via the isVisible prop
- Handles are positioned exactly at the edge of nodes with a visual offset
- Transitions are smooth for all visibility changes

#### Styling

The component uses the following design system tokens:

- Size: `designSystem.handles.size.width`, `designSystem.handles.size.height`
- Colors: `designSystem.handles.colors.default`, `designSystem.handles.colors.hover`
- Transitions: `designSystem.handles.transitions.opacity`
- Z-index: `designSystem.zIndex.handles`

### PropertyRow

A component that provides a consistent layout for node properties with automatic separators.

#### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| hasChild | `boolean` | Yes | - | Whether the property has a child node |
| children | `React.ReactNode` | Yes | - | The content of the property row |

#### Usage

```tsx
// Basic property row
<PropertyRow hasChild={false}>
  <PropertyKey>key</PropertyKey>
  <PropertyValue>value</PropertyValue>
</PropertyRow>

// Property row with child node connection
<PropertyRow hasChild={true}>
  <PropertyKey>key</PropertyKey>
  <PropertyValue>value</PropertyValue>
  <NodeHandle
    type="source"
    position={Position.Right}
  />
</PropertyRow>
```

#### Behavior

- Renders a grid layout with three columns
- Automatically adds separators between rows (except for the last row)
- Maintains consistent spacing and alignment

#### Styling

The component uses the following design system tokens:

- Layout: Grid with `auto 1fr auto` columns
- Spacing: `8px` gap
- Separator: `designSystem.borders.separator`
- Padding: `designSystem.spacing.nodePadding`
- Gap: `designSystem.spacing.propertyGap`

## Design System Integration

### Using Design System Tokens

All components should use design system tokens for styling:

```tsx
const StyledComponent = styled.div`
  color: ${designSystem.colors.values.default};
  padding: ${designSystem.spacing.nodePadding};
  transition: ${designSystem.handles.transitions.opacity};
  z-index: ${designSystem.zIndex.handles};
`;
```

### Handle Positioning

Handles must be positioned using the design system's positioning system:

```tsx
const StyledHandle = styled(Handle)`
  position: absolute;
  ${({ position }) => {
    switch (position) {
      case Position.Left:
        return `
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
        `;
      case Position.Right:
        return `
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
        `;
    }
  }}
`;
```

### Property Row Separators

Property row separators must be implemented using pseudo-elements:

```tsx
const StyledPropertyRow = styled.div`
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: -${designSystem.spacing.nodePadding};
    right: -${designSystem.spacing.nodePadding};
    bottom: -${parseInt(designSystem.spacing.propertyGap) / 2}px;
    height: 1px;
    background: ${designSystem.borders.separator};
  }
`;
```

## Testing

### Visual Regression Testing

Components include visual regression tests to ensure consistent appearance:

```tsx
describe('NodeHandle', () => {
  it('should match snapshot for target handle', () => {
    const { container } = render(
      <NodeHandle
        type="target"
        position={Position.Left}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### Interaction Testing

Components include tests for interaction states:

```tsx
describe('NodeHandle', () => {
  it('should handle visibility changes', () => {
    const { container } = render(
      <NodeHandle
        type="source"
        position={Position.Right}
        isVisible={false}
      />
    );
    expect(container.firstChild).toHaveStyle({
      opacity: '0',
      'pointer-events': 'none'
    });
  });
});
```

## Best Practices

1. Always use design system tokens for styling
2. Implement proper TypeScript types
3. Include comprehensive tests
4. Document all props and behaviors
5. Follow accessibility guidelines
6. Maintain consistent code style
7. Use proper naming conventions
8. Keep components focused and single-purpose 