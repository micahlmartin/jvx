# Testing Guidelines

## Overview
This document outlines our testing approach and best practices for ensuring code quality and reliability.

## Test Types

### Unit Tests
- Test individual components and functions
- Focus on isolated functionality
- Use Jest and React Testing Library
- Mock external dependencies

### Integration Tests
- Test component interactions
- Verify data flow between components
- Test user interactions and state changes
- Use React Testing Library for component testing

### Visual Regression Tests
- Capture and compare component snapshots
- Test responsive layouts
- Verify Tailwind CSS classes are applied correctly
- Use jest-image-snapshot for visual comparisons

## Testing Tools

### Jest
Our primary testing framework for running tests and assertions.

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');
  });
});
```

### React Testing Library
Used for rendering components and testing user interactions.

```typescript
import { render, fireEvent } from '@testing-library/react';

test('button click changes state', () => {
  const { getByRole } = render(<Button />);
  const button = getByRole('button');
  
  fireEvent.click(button);
  expect(button).toHaveClass('bg-blue-600');
});
```

### Visual Testing
Use jest-image-snapshot for visual regression testing:

```typescript
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

it('matches visual snapshot', () => {
  const { container } = render(<MyComponent />);
  expect(container).toMatchImageSnapshot();
});
```

## Testing Patterns

### Component Testing
1. Test component rendering
2. Verify Tailwind classes are applied
3. Test interactive states
4. Check accessibility attributes

```typescript
describe('Button', () => {
  it('applies correct Tailwind classes', () => {
    const { getByRole } = render(<Button variant="primary" />);
    const button = getByRole('button');
    
    expect(button).toHaveClass('bg-blue-500', 'hover:bg-blue-600');
  });

  it('changes style on hover', () => {
    const { getByRole } = render(<Button />);
    const button = getByRole('button');
    
    fireEvent.mouseEnter(button);
    expect(button).toHaveClass('bg-blue-600');
  });
});
```

### Layout Testing
1. Test responsive layouts
2. Verify grid and flex layouts
3. Check spacing and alignment

```typescript
describe('Layout', () => {
  it('uses correct grid classes', () => {
    const { container } = render(<Layout />);
    const grid = container.firstChild;
    
    expect(grid).toHaveClass('grid', 'grid-cols-2', 'md:grid-cols-4');
  });
});
```

### Theme Testing
1. Verify theme tokens are used correctly
2. Test color applications
3. Check typography scales

```typescript
describe('Theme', () => {
  it('uses theme colors', () => {
    const { getByTestId } = render(<Card />);
    const card = getByTestId('card');
    
    expect(card).toHaveClass('bg-background', 'text-text-primary');
  });
});
```

## Best Practices

### General Guidelines
1. Write descriptive test names
2. Test component behavior, not implementation
3. Use meaningful assertions
4. Keep tests focused and isolated

### Tailwind CSS Testing
1. Test presence of utility classes
2. Verify responsive classes
3. Check interactive state classes
4. Test theme token usage

### Accessibility Testing
1. Use proper ARIA roles
2. Test keyboard navigation
3. Verify focus states
4. Check color contrast

## Test Organization

### File Structure
```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx
      __snapshots__/
        Button.test.tsx.snap
```

### Test Structure
```typescript
describe('Component', () => {
  describe('rendering', () => {
    // Test initial render
  });
  
  describe('interactions', () => {
    // Test user interactions
  });
  
  describe('styling', () => {
    // Test Tailwind classes
  });
  
  describe('accessibility', () => {
    // Test a11y features
  });
});
```

## Review Checklist
- [ ] All components have unit tests
- [ ] Interactive features have integration tests
- [ ] Visual regression tests are included
- [ ] Tailwind classes are verified
- [ ] Accessibility is tested
- [ ] Tests are maintainable and readable 