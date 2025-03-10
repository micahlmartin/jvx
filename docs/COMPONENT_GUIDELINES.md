# Component Guidelines

## Overview
This document outlines the guidelines and best practices for component development in our application. These guidelines ensure consistency, maintainability, and proper implementation of our design system.

## General Component Guidelines

### 1. Component Structure
- Use TypeScript for all component definitions
- Export components as named exports
- Include comprehensive prop interfaces
- Implement proper prop validation
- Use functional components with proper type annotations

### 2. Styling
- Use Tailwind CSS for all component styling
- Always reference design system tokens through Tailwind classes for:
  - Colors (e.g., `text-text-primary`, `bg-background`)
  - Spacing (e.g., `p-4`, `gap-2`)
  - Typography (e.g., `text-sm`, `font-normal`)
  - Transitions (e.g., `transition-all duration-150`)
  - Z-indices (e.g., `z-50`)
- Avoid arbitrary values unless absolutely necessary
- Use CSS variables in Tailwind config for theme values
- Maintain consistent class ordering:
  1. Layout (display, position, etc.)
  2. Box model (width, height, padding, margin)
  3. Typography
  4. Visual (background, border, etc.)
  5. Interactive states (hover, focus, etc.)
- Use dynamic classes with template literals when needed:
  ```tsx
  className={`base-classes ${condition ? 'active-state' : 'inactive-state'}`}
  ```

### 3. Testing
- Include comprehensive test coverage
- Implement visual regression tests for components
- Test all component states and variations
- Use proper test selectors and attributes

## Specific Component Guidelines

### NodeHandle Component

#### Implementation Requirements
1. **Props**:
   - `type: 'source' | 'target'` - Required
   - `position: Position` - Required
   - `isVisible?: boolean` - Optional, defaults to true
   - `id?: string` - Optional
   - `className?: string` - Optional

2. **Styling**:
   - Must use Tailwind classes for all visual properties
   - Must implement proper positioning based on type
   - Must handle visibility states correctly using conditional classes

3. **Behavior**:
   - Target handles must be invisible by default
   - Source handles must be visible by default
   - Must handle connection states appropriately
   - Must maintain proper pointer events based on state

### PropertyRow Component

#### Implementation Requirements
1. **Props**:
   - `hasChild: boolean` - Required
   - `children: React.ReactNode` - Required

2. **Styling**:
   - Must use Tailwind grid classes as specified
   - Must implement separator using border utilities
   - Must use Tailwind spacing scale
   - Must handle last child case properly using last: utilities

3. **Behavior**:
   - Must maintain consistent spacing using Tailwind gap utilities
   - Must render separator for non-last children
   - Must support nested content properly

## Best Practices

### 1. State Management
- Use local state for component-specific state
- Implement controlled components when needed
- Handle state updates efficiently

### 2. Performance
- Implement proper memoization where needed
- Avoid unnecessary re-renders
- Use proper key props in lists
- Consider extracting commonly used class combinations into Tailwind components

### 3. Accessibility
- Include proper ARIA attributes
- Ensure keyboard navigation support
- Maintain proper focus management
- Use Tailwind's focus-visible utilities for focus states

### 4. Documentation
- Include JSDoc comments for all components
- Document all props and their purposes
- Include usage examples with Tailwind classes
- Document any special considerations or edge cases

## Code Style

### 1. File Structure
```typescript
// Imports
import React from 'react';

// Types/Interfaces
interface ComponentProps {
  // Props definition
}

// Component
export const Component: React.FC<ComponentProps> = ({ /* props */ }) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-background text-text-primary">
      {/* Implementation */}
    </div>
  );
};
```

### 2. Naming Conventions
- Use PascalCase for component names
- Use camelCase for props and variables
- Use descriptive class names that reflect purpose
- Prefix boolean props with is/has/should

### 3. Props
- Destructure props in component parameters
- Provide default values where appropriate
- Use proper TypeScript types
- Document required vs optional props

## Review Checklist
- [ ] Component follows TypeScript guidelines
- [ ] All styles use Tailwind classes with design system tokens
- [ ] Complex class combinations are organized and documented
- [ ] Tests are comprehensive and passing
- [ ] Documentation is complete and accurate
- [ ] Accessibility requirements are met
- [ ] Performance considerations are addressed
- [ ] Code style guidelines are followed 