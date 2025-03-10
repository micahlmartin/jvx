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
- Use styled-components for component styling
- Always reference design system tokens for:
  - Colors
  - Spacing
  - Typography
  - Transitions
  - Z-indices
- Avoid hard-coded values
- Use CSS variables for dynamic values

### 3. Testing
- Include comprehensive test coverage
- Implement visual regression tests for styled components
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
   - Must use design system tokens for all visual properties
   - Must implement proper positioning based on type
   - Must handle visibility states correctly

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
   - Must use grid layout as specified
   - Must implement separator correctly
   - Must use design system spacing
   - Must handle last child case properly

3. **Behavior**:
   - Must maintain consistent spacing
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

### 3. Accessibility
- Include proper ARIA attributes
- Ensure keyboard navigation support
- Maintain proper focus management

### 4. Documentation
- Include JSDoc comments for all components
- Document all props and their purposes
- Include usage examples
- Document any special considerations or edge cases

## Code Style

### 1. File Structure
```typescript
// Imports
import React from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';

// Types/Interfaces
interface ComponentProps {
  // Props definition
}

// Styled Components
const StyledComponent = styled.div`
  // Styles
`;

// Component
export const Component: React.FC<ComponentProps> = ({ /* props */ }) => {
  // Implementation
};
```

### 2. Naming Conventions
- Use PascalCase for component names
- Use camelCase for props and variables
- Use descriptive names for styled components
- Prefix boolean props with is/has/should

### 3. Props
- Destructure props in component parameters
- Provide default values where appropriate
- Use proper TypeScript types
- Document required vs optional props

## Review Checklist
- [ ] Component follows TypeScript guidelines
- [ ] All styles use design system tokens
- [ ] Tests are comprehensive and passing
- [ ] Documentation is complete and accurate
- [ ] Accessibility requirements are met
- [ ] Performance considerations are addressed
- [ ] Code style guidelines are followed 