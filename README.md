# JVIZ

A powerful JSON visualization tool built with React and TypeScript.

## Features

- Interactive JSON visualization
- Node-based graph representation
- Smooth connections between nodes
- Type-aware value display
- Responsive design
- Accessible interface

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- Docker and Docker Compose
- asdf version manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jviz.git
cd jviz
```

2. Install dependencies:
```bash
asdf install
npm install
```

3. Start the development server:
```bash
docker compose up -d
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

### Core Documentation

- [Design System](docs/DESIGN_SYSTEM.md) - Visual design guidelines and tokens
- [Component Guidelines](docs/COMPONENT_GUIDELINES.md) - Component development standards
- [API Documentation](docs/API.md) - Component API reference
- [Testing Guidelines](docs/TESTING.md) - Testing standards and practices
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute to the project

### Development Workflow

1. Set up your development environment following the [Contributing Guidelines](CONTRIBUTING.md)
2. Follow the [Design System](docs/DESIGN_SYSTEM.md) for visual consistency
3. Implement components according to [Component Guidelines](docs/COMPONENT_GUIDELINES.md)
4. Write tests following [Testing Guidelines](docs/TESTING.md)
5. Submit changes through pull requests

## Architecture

### Component Structure

```
src/
├── components/
│   └── nodes/
│       ├── NodeHandle.tsx     # Connection points for nodes
│       ├── PropertyRow.tsx    # Row layout for node properties
│       ├── ObjectNode.tsx     # Object type node
│       ├── ArrayNode.tsx      # Array type node
│       └── ValueNode.tsx      # Primitive value node
├── styles/
│   └── design-system.ts       # Design system tokens
└── utils/
    └── jsonToGraph.ts         # JSON to graph conversion
```

### Key Components

#### NodeHandle

Connection points for nodes:
```tsx
<NodeHandle
  type="source"
  position={Position.Right}
  isVisible={true}
/>
```

#### PropertyRow

Layout for node properties:
```tsx
<PropertyRow hasChild={true}>
  <PropertyKey>key</PropertyKey>
  <PropertyValue>value</PropertyValue>
</PropertyRow>
```

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

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

### Code Style

We use ESLint and Prettier for code style:

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix
```

## Design System

Our design system ensures consistent visual appearance:

- Colors use design system tokens
- Spacing follows a consistent scale
- Typography uses defined sizes
- Components follow positioning guidelines

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting changes.

### Pull Request Process

1. Follow the [Component Guidelines](docs/COMPONENT_GUIDELINES.md)
2. Update documentation as needed
3. Add or update tests
4. Submit a pull request using our template

## Testing

We maintain high test coverage:

- Unit tests for components
- Visual regression tests
- Integration tests
- Accessibility tests

See [Testing Guidelines](docs/TESTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React Flow for graph visualization
- Styled Components for styling
- Jest and Testing Library for testing
- TypeScript for type safety
