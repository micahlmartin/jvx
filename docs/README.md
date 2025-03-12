# JVX Documentation

## Directory Structure

```
docs/
├── features/           # Feature specifications and designs
│   ├── _template.md   # Feature specification template
│   └── ...            # Individual feature specs
├── guides/            # Development and usage guides
│   ├── contributing.md      # Contribution guidelines
│   ├── testing.md          # Testing guidelines
│   ├── components.md       # Component development guide
│   └── api.md             # API documentation
├── architecture/      # System architecture documentation
│   ├── design.md           # System design overview
│   └── design-system.md    # UI/UX design system
└── project/          # Project management docs
    └── plan.md            # Project roadmap and planning
```

## Documentation Guidelines

1. Use lowercase with hyphens for filenames
2. Place feature specifications in `features/`
3. Place development guides in `guides/`
4. Place architecture documentation in `architecture/`
5. Place project management docs in `project/`

## Migration Plan

The following files will be reorganized:
- `CONTRIBUTING.md` → `guides/contributing.md`
- `TESTING.md` → `guides/testing.md`
- `API.md` → `guides/api.md`
- `COMPONENT_GUIDELINES.md` → `guides/components.md`
- `DESIGN.md` → `architecture/design.md`
- `DESIGN_SYSTEM.md` → `architecture/design-system.md`
- `PROJECT_PLAN.md` → `project/plan.md`

The `specs` directory will be merged into `features` as they serve the same purpose. 