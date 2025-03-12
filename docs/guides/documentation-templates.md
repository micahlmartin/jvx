# Documentation Templates

## Overview
This guide provides templates and examples for documenting different types of code elements in our codebase. Following these templates ensures consistency and completeness in our documentation.

## Component Documentation Template

```typescript
/**
 * ComponentName - A brief, single-line description of the component's purpose.
 *
 * @component
 * @example
 * ```tsx
 * <ComponentName
 *   requiredProp="value"
 *   optionalProp={42}
 *   onEvent={() => handleEvent()}
 * />
 * ```
 *
 * @remarks
 * Provide a more detailed description here if needed. Include:
 * - Key features
 * - Important behaviors
 * - Side effects
 * - Cleanup operations
 * - Performance considerations
 * - Accessibility features
 *
 * @designSystem
 * This component uses the following design system tokens:
 * - colors.primary: Main color scheme
 * - spacing.md: Standard padding
 * - etc.
 */

interface ComponentNameProps {
  /** Description of the required prop and its purpose */
  requiredProp: string;

  /** 
   * Description of the optional prop
   * @default defaultValue
   */
  optionalProp?: number;

  /** 
   * Callback fired when something happens
   * @param event - Description of the event parameter
   */
  onEvent?: (event: EventType) => void;
}
```

## Hook Documentation Template

```typescript
/**
 * Brief description of what the hook does.
 *
 * @hook
 * @example
 * ```tsx
 * const result = useHookName(param);
 * ```
 *
 * @param param - Description of the parameter
 * @returns Description of the return value
 *
 * @remarks
 * Additional details about:
 * - Dependencies
 * - Side effects
 * - Cleanup
 * - Performance implications
 * - Usage considerations
 */
function useHookName(param: ParamType): ReturnType {
  // Implementation
}
```

## Context Documentation Template

```typescript
/**
 * Brief description of what this context provides.
 *
 * @context
 * @example
 * ```tsx
 * const contextValue = useMyContext();
 * ```
 *
 * @remarks
 * Detailed information about:
 * - Available values and methods
 * - State management
 * - Performance considerations
 * - Usage patterns
 */

interface MyContextValue {
  /** Description of the value */
  value: ValueType;

  /** Description of the method */
  updateValue: (newValue: ValueType) => void;
}
```

## Utility Function Documentation Template

```typescript
/**
 * Brief description of what the utility function does.
 *
 * @function
 * @example
 * ```typescript
 * const result = utilityFunction(param1, param2);
 * ```
 *
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of return value
 * @throws Description of potential errors
 *
 * @remarks
 * Additional details about:
 * - Edge cases
 * - Performance characteristics
 * - Usage considerations
 */
function utilityFunction(param1: Type1, param2: Type2): ReturnType {
  // Implementation
}
```

## Type Documentation Template

```typescript
/**
 * Description of what this type represents.
 *
 * @typedef
 * @example
 * ```typescript
 * const value: MyType = {
 *   property: "value"
 * };
 * ```
 */
type MyType = {
  /** Description of the property */
  property: string;
};
```

## Documentation Sections

### Required Sections for Components
1. **Brief Description**: Single-line component purpose
2. **Example Usage**: Basic implementation example
3. **Props Documentation**: All props with descriptions
4. **Remarks**: Detailed behavior and considerations
5. **Design System Integration**: Used design tokens
6. **Accessibility**: ARIA roles, keyboard navigation
7. **Performance**: Optimization considerations

### Required Sections for Hooks
1. **Brief Description**: Hook's purpose
2. **Parameters**: All parameters with descriptions
3. **Return Value**: What the hook returns
4. **Example Usage**: Basic implementation
5. **Side Effects**: Effects and cleanup
6. **Dependencies**: Required context/state

### Required Sections for Context
1. **Brief Description**: Context purpose
2. **Value Interface**: Available values/methods
3. **Example Usage**: Provider and consumer examples
4. **State Management**: Update patterns
5. **Performance**: Re-render considerations

### Required Sections for Types
1. **Brief Description**: Type purpose
2. **Properties**: All properties with descriptions
3. **Example Usage**: Implementation example
4. **Constraints**: Any type constraints

## Best Practices

1. **Clarity**
   - Use clear, concise language
   - Provide specific examples
   - Document edge cases
   - Include error scenarios

2. **Completeness**
   - Document all public APIs
   - Include all parameters
   - Describe return values
   - List side effects

3. **Consistency**
   - Follow template structure
   - Use consistent terminology
   - Maintain formatting
   - Use standard JSDoc tags

4. **Updates**
   - Keep examples current
   - Update when behavior changes
   - Maintain version compatibility
   - Document breaking changes

## Example Component Documentation

```typescript
/**
 * Button - A customizable button component that follows our design system.
 *
 * @component
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="md"
 *   onClick={() => console.log('clicked')}
 *   disabled={false}
 * >
 *   Click Me
 * </Button>
 * ```
 *
 * @remarks
 * The Button component provides a consistent button interface across the application.
 * It handles various states including hover, focus, active, and disabled states.
 * The component is optimized for performance and accessibility.
 *
 * Features:
 * - Multiple variants (primary, secondary, text)
 * - Different sizes (sm, md, lg)
 * - Loading state support
 * - Icon support
 * - Full keyboard navigation
 * - ARIA compliance
 *
 * @designSystem
 * Uses the following design tokens:
 * - colors.button.[variant]
 * - spacing.button.[size]
 * - typography.button
 * - animation.button
 *
 * @accessibility
 * - Supports keyboard navigation
 * - Includes proper ARIA attributes
 * - Maintains focus visibility
 * - Announces loading state
 *
 * @performance
 * - Memoized internal handlers
 * - Optimized re-renders
 * - Lazy-loaded icons
 */

interface ButtonProps {
  /** The visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'text';

  /** The size of the button */
  size?: 'sm' | 'md' | 'lg';

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Whether the button is in a loading state */
  loading?: boolean;

  /** Icon to display before the button text */
  icon?: React.ReactNode;

  /** Handler called when the button is clicked */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Button contents */
  children: React.ReactNode;
}
``` 