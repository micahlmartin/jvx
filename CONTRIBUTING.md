# Contributing to JViz

Thank you for your interest in contributing to JViz! This document will guide you through the contribution process.

## Prerequisites

- Node.js (Latest LTS version)
- Git
- A code editor (we recommend VS Code)

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/jviz.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

1. Follow the existing code style
2. Use TypeScript for all new code
3. Use meaningful variable and function names
4. Add comments for complex logic
5. Keep functions small and focused

### Component Guidelines

1. Follow React best practices
2. Use functional components with hooks
3. Keep components small and reusable
4. Use proper TypeScript types
5. Follow accessibility guidelines

### Documentation

All new features and changes should be properly documented:

1. Update relevant documentation files
2. Add JSDoc comments to functions and components
3. Update README if necessary
4. Document any configuration changes

### Pull Request Process

1. Create a new branch for your feature/fix
2. Make your changes
3. Update documentation as needed
4. Submit a pull request

Your pull request should:
- Have a clear title and description
- Reference any related issues
- Include documentation updates
- Follow our code style guidelines

### Project Structure

```
jviz/
├── src/               # Source code
│   ├── components/    # React components
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   └── types/        # TypeScript types
├── public/           # Static assets
├── docs/             # Documentation
└── styles/           # Global styles
```

### Best Practices

- Write clean, maintainable code
- Follow the Single Responsibility Principle
- Keep components small and focused
- Use meaningful names
- Document your code
- Follow accessibility guidelines
- Test with screen readers
- Consider performance implications

### Feature Development Process

1. Create feature branch
2. Implement feature
3. Update documentation
4. Submit pull request

### Bug Fix Process

1. Create bug fix branch
2. Implement fix
3. Update documentation
4. Submit pull request

## Questions?

If you have questions, please open an issue or reach out to the maintainers.

Thank you for contributing to JViz! 