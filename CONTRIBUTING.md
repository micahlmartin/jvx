# Contributing to JVX

## Overview

Thank you for considering contributing to JVX! This document provides guidelines and instructions for contributing to the project. We strive to maintain high standards of code quality and design consistency.

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- Docker and Docker Compose
- asdf version manager

### Development Environment Setup

1. Install asdf and required plugins:
```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
asdf plugin add nodejs
asdf plugin add python
```

2. Install project dependencies:
```bash
asdf install
npm install
```

3. Start the development environment:
```bash
docker compose up -d
npm run dev
```

## Development Guidelines

### Code Style

We use a combination of ESLint, Prettier, and TypeScript to maintain code quality:

```bash
# Check code style
npm run lint

# Fix automatic style issues
npm run lint:fix

# Type check
npm run type-check
```

### Design System

All components must follow our [Design System](docs/DESIGN_SYSTEM.md) guidelines. Key points:

- Use design system tokens for all visual properties
- Follow component structure guidelines
- Maintain accessibility standards
- Use proper TypeScript types

### Component Development

1. Follow the [Component Guidelines](docs/COMPONENT_GUIDELINES.md)
2. Create components in appropriate directories:
   - `/src/components/` for shared components
   - `/src/components/nodes/` for node-specific components
3. Include comprehensive tests
4. Add proper documentation

### Testing

We maintain comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Update snapshots
npm test -- -u
```

#### Test Requirements

1. Unit Tests
   - Test all component props
   - Test all component states
   - Test error conditions
   - Test edge cases

2. Visual Regression Tests
   - Test component appearance
   - Test component interactions
   - Test responsive behavior

3. Integration Tests
   - Test component interactions
   - Test data flow
   - Test error handling

### Documentation

All code changes should include appropriate documentation:

1. Change Documentation
   - Create a file in `docs/changes/` with format `YYYYMMDD-description.md`
   - Document the change, its rationale, and implementation details
   - Include any design considerations or tradeoffs
   - Reference related issues or PRs

2. JSDoc Comments
   - Document all components
   - Document all props
   - Include usage examples
   - Document side effects

3. README Updates
   - Document new features
   - Update usage examples
   - Update API documentation

4. Design System Documentation
   - Document new tokens
   - Document new patterns
   - Update guidelines

## Pull Request Process

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following our guidelines

3. Ensure all tests pass:
```bash
npm run test
npm run lint
npm run type-check
```

4. Update documentation as needed

5. Create a pull request using our [template](.github/pull_request_template.md)

### PR Requirements

- [ ] Follows design system guidelines
- [ ] Includes comprehensive tests
- [ ] Updates documentation
- [ ] Passes all checks
- [ ] Includes visual regression tests
- [ ] Maintains or improves test coverage

## Project Structure

```
jvx/
├── src/
│   ├── components/        # React components
│   │   └── nodes/        # Node-specific components
│   ├── styles/           # Global styles and design system
│   ├── utils/            # Utility functions
│   └── types/           # TypeScript type definitions
├── docs/                # Documentation
├── tests/              # Test utilities and helpers
└── public/            # Static assets
```

## Design Principles

1. **Consistency**
   - Follow established patterns
   - Use design system tokens
   - Maintain consistent code style

2. **Maintainability**
   - Write clear, self-documenting code
   - Include comprehensive tests
   - Keep components focused and single-purpose

3. **Performance**
   - Optimize render performance
   - Minimize bundle size
   - Use proper memoization

4. **Accessibility**
   - Follow WCAG guidelines
   - Test with screen readers
   - Maintain keyboard navigation

## Common Tasks

### Adding a New Component

1. Create component file in appropriate directory
2. Create test file
3. Create documentation
4. Update exports
5. Add visual regression tests

### Updating Design System

1. Update design system tokens
2. Update documentation
3. Update affected components
4. Update visual regression tests
5. Update ESLint rules if needed

### Adding New Features

1. Discuss in an issue first
2. Create design doc if needed
3. Implement following guidelines
4. Add comprehensive tests
5. Update documentation

## Getting Help

- Check existing documentation
- Review similar PRs
- Ask in issues or discussions
- Review design system guidelines

## License

By contributing, you agree that your contributions will be licensed under the project's license. 