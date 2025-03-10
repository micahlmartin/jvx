# Testing Guidelines

## Overview

This document outlines our testing strategy and requirements for the JVX project. We maintain high test coverage and quality through a combination of unit tests, visual regression tests, and integration tests.

## Test Types

### 1. Unit Tests

Unit tests verify individual component behavior and functionality.

#### Requirements

- Test all component props
- Test all component states
- Test error conditions
- Test edge cases
- Maintain isolated tests

#### Example

```tsx
describe('NodeHandle', () => {
  describe('Visibility Rules', () => {
    it('should render target handle with opacity 0 by default', () => {
      const { container } = render(
        <NodeHandle
          type="target"
          position={Position.Left}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        opacity: '0',
        pointerEvents: 'none'
      });
    });
  });
});
```

### 2. Visual Regression Tests

Visual regression tests ensure consistent component appearance and catch unintended visual changes.

#### Requirements

- Test component appearance
- Test component states
- Test responsive behavior
- Test theme variations
- Test animations and transitions

#### Example

```tsx
describe('Visual Regression', () => {
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

### 3. Integration Tests

Integration tests verify component interactions and data flow.

#### Requirements

- Test component interactions
- Test data flow
- Test error handling
- Test side effects
- Test real-world scenarios

#### Example

```tsx
describe('Node Connections', () => {
  it('should allow connection between source and target handles', () => {
    const { getByTestId } = render(
      <>
        <Node1 />
        <Node2 />
      </>
    );
    
    // Test connection interaction
    fireEvent.mouseDown(getByTestId('handle-source'));
    fireEvent.mouseMove(getByTestId('handle-target'));
    fireEvent.mouseUp();
    
    expect(onConnect).toHaveBeenCalled();
  });
});
```

## Test Organization

### File Structure

```
src/
├── components/
│   └── nodes/
│       ├── __tests__/
│       │   ├── NodeHandle.test.tsx
│       │   └── PropertyRow.test.tsx
│       ├── NodeHandle.tsx
│       └── PropertyRow.tsx
└── test/
    ├── setup.ts
    └── utils/
        └── flow-test-utils.tsx
```

### Test File Naming

- Unit tests: `ComponentName.test.tsx`
- Integration tests: `ComponentName.integration.test.tsx`
- Visual regression tests: `ComponentName.visual.test.tsx`

## Testing Tools

### Jest

Our primary testing framework.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Update snapshots
npm test -- -u
```

### Testing Library

Used for rendering components and simulating user interactions.

```tsx
import { render, fireEvent } from '@testing-library/react';
```

### jest-styled-components

Provides enhanced snapshot testing and style assertions for styled-components.

```tsx
import 'jest-styled-components';
```

## Best Practices

### 1. Test Organization

- Group related tests using `describe` blocks
- Use clear, descriptive test names
- Follow the Arrange-Act-Assert pattern
- Keep tests focused and single-purpose

### 2. Test Coverage

- Maintain high test coverage (minimum 80%)
- Test all code paths
- Test error conditions
- Test edge cases

### 3. Test Independence

- Each test should be independent
- Clean up after each test
- Avoid test interdependence
- Use proper setup and teardown

### 4. Assertions

- Use specific assertions
- Test one thing per test
- Use proper matchers
- Avoid testing implementation details

## Common Patterns

### 1. Testing Styled Components

```tsx
it('should have correct styles', () => {
  const { container } = render(<Component />);
  expect(container.firstChild).toHaveStyleRule('property', 'value');
});
```

### 2. Testing Props

```tsx
it('should handle props correctly', () => {
  const { rerender, container } = render(<Component prop={value1} />);
  expect(container.firstChild).toHaveStyle({ /* styles */ });
  
  rerender(<Component prop={value2} />);
  expect(container.firstChild).toHaveStyle({ /* different styles */ });
});
```

### 3. Testing User Interactions

```tsx
it('should handle user interactions', () => {
  const { getByRole } = render(<Component />);
  const element = getByRole('button');
  
  fireEvent.click(element);
  expect(/* result */);
});
```

## Test Coverage Requirements

We maintain strict test coverage requirements:

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## Visual Regression Testing

### Setup

We use jest-image-snapshot for visual regression testing:

```tsx
// jest.setup.js
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });
```

### Running Tests

```bash
# Update visual snapshots
npm test -- -u

# Run only visual tests
npm test -- --testRegex="\\.visual\\.test\\.tsx$"
```

## Continuous Integration

Tests are run automatically in CI:

- On pull requests
- On merge to main
- On release branches

### CI Configuration

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

## Debugging Tests

### Common Issues

1. Snapshot mismatches
   - Check for intended changes
   - Update snapshots if changes are expected
   - Review diff carefully

2. Style assertions
   - Use proper style matchers
   - Check for dynamic styles
   - Verify design system token usage

3. Async tests
   - Use proper async/await
   - Handle promises correctly
   - Use proper wait utilities

### Debugging Tools

```bash
# Run tests with debugger
node --inspect-brk node_modules/.bin/jest --runInBand

# Run specific tests
npm test -- ComponentName

# Show test coverage
npm test -- --coverage
``` 