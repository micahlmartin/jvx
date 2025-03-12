# Update Fit View Icon

## Overview
This change updates the "fit view" icon in the graph controls to better align with common UX patterns and improve user understanding of the functionality.

## Design Considerations

### Current Icon
The current icon uses four outward-pointing arrows in a cross pattern:
```svg
<path d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14M15 21H21M21 21V15M21 21L14 14M9 3H3M3 3V9M3 3L10 10" />
```

Issues:
- Could be confused with move/drag functionality
- Not immediately recognizable as "fit to view"
- Takes up more visual space than necessary

### New Icon
The new icon uses corner brackets to indicate viewport fitting:
```svg
<path d="M4 14V16C4 17.1046 4.89543 18 6 18H8M4 10V8C4 6.89543 4.89543 6 6 6H8M20 14V16C20 17.1046 19.1046 18 18 18H16M20 10V8C20 6.89543 19.1046 6 18 6H16" />
```

Benefits:
- Clearer representation of viewport/frame
- More aligned with common design patterns
- Consistent with design system
- Better visual hierarchy

## Design System Compliance
- Uses `currentColor` for theme compatibility
- Maintains `strokeWidth="2"` for consistency
- Uses `strokeLinecap="round"` and `strokeLinejoin="round"` per design system
- Maintains 24x24 viewBox with 20px effective area
- Icon scaled to `w-5 h-5` per component guidelines

## Accessibility
- Icon maintains clear visual meaning
- Includes proper `title` attribute for screen readers
- Maintains sufficient contrast in both light and dark themes

## Testing
- Visual regression tests will be updated
- Component functionality remains unchanged
- Icon renders correctly at all supported sizes

## Implementation
The change is implemented in `src/components/controls/GraphControls.tsx` and affects only the SVG path data for the fit view icon. 