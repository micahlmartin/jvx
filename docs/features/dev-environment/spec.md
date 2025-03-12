# Development Environment Feature Specification

## Overview
A standardized development environment setup for JVX microservices that ensures consistent, efficient, and maintainable development across multiple services with different runtime requirements.

## Problem Statement
Development teams working on JVX microservices face challenges with inconsistent environments, complex setup procedures, and difficulties switching between services. This leads to reduced productivity and potential production issues due to environment inconsistencies.

### User Stories
- As a developer, I want to quickly set up my development environment so that I can start contributing immediately
- As a developer, I want to work on multiple services simultaneously so that I can develop and test integrated features
- As a team lead, I want to ensure consistent development environments so that we avoid "works on my machine" issues
- As a new team member, I want clear setup instructions so that I can onboard quickly

### Requirements

#### Functional Requirements
- [ ] Single unified development container with all required tools
- [ ] Support for multiple runtime environments (Node.js, Python, Rust)
- [ ] Consistent development experience across all services
- [ ] Integrated debugging support for all supported languages
- [ ] Hot reload capability for development
- [ ] Shared configuration and tooling across services
- [ ] Resource-efficient container management

#### Non-functional Requirements
- [ ] Setup time under 15 minutes for new developers
- [ ] Resource usage within specified limits
- [ ] Consistent performance across different host systems
- [ ] Clear documentation and onboarding guides
- [ ] Security best practices implementation

## Technical Design

### Architecture

#### Components
1. **Development Platform Repository**
   - Base container configurations
   - Shared development scripts
   - Documentation and guidelines
   - Service templates
   - Reusable dev container features
   - Common tooling and utilities

2. **Service Repositories**
   - Service-specific code
   - Extended container configurations
   - Service-specific tooling
   - Local development overrides

3. **Development Container**
   - Base development image
   - Runtime environments
   - Development tools
   - Debugging capabilities

### Component Design

#### Base Configuration
```json
// dev-platform/.devcontainer/base/node.json
{
  "name": "Node.js Base",
  "build": {
    "dockerfile": "node.Dockerfile"
  },
  "features": {
    "common": {
      "git": "latest",
      "docker-in-docker": "latest"
    },
    "node": {
      "version": "20",
      "packages": ["typescript"]
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode"
      ]
    }
  }
}
```

#### Service Configuration
```json
// service-name/.devcontainer/devcontainer.json
{
  "name": "${serviceName} Development",
  "extends": "github:organization/dev-platform//base/node.json",
  "dockerComposeFile": [
    "docker-compose.yml",
    "${localEnv:DEV_PLATFORM_PATH}/docker-compose.shared.yml"
  ],
  "service": "app",
  "workspaceFolder": "/workspace",
  "postCreateCommand": "npm install"
}
```

### Directory Structure
```
organization/
├── dev-platform/                # Central development platform
│   ├── .devcontainer/          
│   │   ├── base/               # Base container definitions
│   │   │   ├── node.Dockerfile
│   │   │   ├── python.Dockerfile
│   │   │   └── rust.Dockerfile
│   │   ├── features/          # Reusable dev container features
│   │   │   ├── common/
│   │   │   └── language-specific/
│   │   └── templates/         # Service templates
│   │       ├── node/
│   │       ├── python/
│   │       └── rust/
│   └── scripts/               # Development utilities
│
├── service-frontend/          # Individual service repositories
│   ├── .devcontainer/
│   │   ├── devcontainer.json  # Extends base configuration
│   │   └── docker-compose.yml # Service-specific compose
│   └── src/
│
└── service-backend/
    ├── .devcontainer/
    │   ├── devcontainer.json
    │   └── docker-compose.yml
    └── src/
```

### Configuration Management

#### 1. Version Control
- Base configurations versioned in dev-platform
- Services reference specific versions
- Automated update notifications
- Semantic versioning for configurations

#### 2. Environment Variables
```bash
# Required environment setup
export DEV_PLATFORM_PATH=/path/to/dev-platform
export DEV_SERVICES_ROOT=/path/to/services
```

#### 3. Docker Compose Integration
```yaml
# docker-compose.shared.yml
version: '3.8'
services:
  base-node:
    build:
      context: .
      dockerfile: ${DEV_PLATFORM_PATH}/base/node.Dockerfile
    volumes:
      - ${DEV_PLATFORM_PATH}:/opt/dev-platform:cached

  base-python:
    build:
      context: .
      dockerfile: ${DEV_PLATFORM_PATH}/base/python.Dockerfile
    volumes:
      - ${DEV_PLATFORM_PATH}:/opt/dev-platform:cached
```

### Development Workflow

#### 1. Initial Setup
```bash
# Clone development platform
git clone organization/dev-platform
export DEV_PLATFORM_PATH=/path/to/dev-platform

# Clone service
git clone organization/service-name
code service-name
```

#### 2. Service Development
- VS Code automatically detects dev container configuration
- Inherits base configuration from dev-platform
- Applies service-specific customizations

#### 3. Multi-Service Development
- Use VS Code workspaces for multiple services
- Share common development tools
- Integrated debugging across services

## Implementation Plan

### Phase 1: Development Platform
- [ ] Create dev-platform repository structure
- [ ] Implement base container definitions
- [ ] Create reusable features
- [ ] Set up version management

### Phase 2: Service Templates
- [ ] Create language-specific templates
- [ ] Implement extension mechanisms
- [ ] Set up configuration inheritance
- [ ] Create development scripts

### Phase 3: Service Migration
- [ ] Convert existing services
- [ ] Update documentation
- [ ] Train development team
- [ ] Establish maintenance procedures

## Testing Strategy

### Environment Tests
- Container build verification
- Resource usage monitoring
- Performance benchmarks
- Multi-service integration tests

### Workflow Tests
- Development setup procedures
- Service initialization
- Hot reload functionality
- Debugging capabilities

## Documentation Requirements
- [ ] Setup guide
- [ ] Development workflows
- [ ] Troubleshooting guide
- [ ] Best practices
- [ ] Service templates
- [ ] Configuration reference

## Success Metrics
- [ ] Development environment setup time < 15 minutes
- [ ] Zero "works on my machine" issues
- [ ] 100% service compatibility
- [ ] Positive developer feedback
- [ ] Reduced onboarding time

## Security Considerations
- Container security best practices
- Development secrets management
- Access control and permissions
- Secure volume mounts

## Performance Requirements
- Initial setup: < 15 minutes
- Container startup: < 30 seconds
- Hot reload: < 2 seconds
- Memory usage: < 2GB per service
- CPU usage: < 50% per service

## Future Considerations
- Cloud development environments
- Additional runtime support
- CI/CD integration
- Remote development capabilities
- Team collaboration features

## References
- [Docker Development Containers](https://docs.docker.com/desktop/dev-environments/)
- [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)
- [Development Container Specification](https://containers.dev/) 