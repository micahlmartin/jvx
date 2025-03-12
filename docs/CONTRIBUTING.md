# Contributing to JVX

## Overview
We follow a design-first approach to development. This means that all features must be thoroughly specified and documented before implementation begins. This guide will walk you through our contribution process.

## Design-First Workflow

### 1. Feature Specification
Before writing any code, create a detailed feature specification:

1. Create a new branch: `feature/your-feature-name`
2. Copy `docs/features/_template.md` to `docs/features/your-feature/SPEC.md`
3. Fill out all sections of the specification:
   - Overview and problem statement
   - User stories and requirements
   - Technical design
   - Implementation plan
   - Testing strategy
   - Documentation requirements
4. Submit the spec for review (PR with only documentation changes)
5. Iterate based on feedback

### 2. Implementation
Once your specification is approved:

1. Follow the implementation plan from your spec
2. Write tests according to the testing strategy
3. Update documentation as you implement
4. Create additional documentation files as needed:
   - `IMPLEMENTATION.md` for implementation details
   - `TESTING.md` for testing specifics
   - API documentation if required

### 3. Pull Request
Your final PR should include:

1. The complete feature specification
2. Implementation code
3. Tests
4. Documentation updates
5. Links to relevant documentation

## Documentation Requirements

### Change Documentation
Every code change must include:
- A file in `docs/changes/` with format `YYYYMMDD-description.md`
- Clear description of what changed and why
- Technical implementation details
- Design considerations and tradeoffs
- References to related issues or PRs

### Feature Specification
Every feature must include:

- Clear problem statement
- User stories
- Technical design
- Implementation plan
- Testing strategy
- Documentation plan

### Implementation Documentation
Include:

- API documentation
- Usage examples
- Component documentation
- Integration guide
- Performance considerations
- Accessibility requirements

### Testing Documentation
Document:

- Unit test coverage
- Integration test scenarios
- Performance test criteria
- Accessibility test requirements

## Code Standards

### TypeScript
- Use TypeScript for all code
- Include comprehensive type definitions
- Document complex types

### Testing
- Write tests before implementation
- Maintain high test coverage
- Include performance tests
- Test accessibility requirements

### Style
- Follow the style guide in `docs/guides/STYLE_GUIDE.md`
- Use Tailwind CSS for styling
- Follow component guidelines

## Review Process

### Specification Review
1. Submit spec-only PR
2. Address feedback
3. Get approval from at least two reviewers
4. Merge spec into main

### Implementation Review
1. Submit implementation PR
2. Ensure all tests pass
3. Documentation is complete
4. Get approval from at least two reviewers
5. Merge implementation into main

## Best Practices

### Documentation
- Keep documentation up to date
- Use clear, concise language
- Include code examples
- Link related documentation
- Update diagrams as needed

### Testing
- Write tests first
- Test edge cases
- Include accessibility tests
- Performance test critical paths

### Code
- Follow TypeScript best practices
- Use functional components
- Implement proper error handling
- Follow accessibility guidelines

## Getting Help

1. Check existing documentation
2. Review similar features
3. Ask in the appropriate channel
4. Reference design system

## Pull Request Template

```markdown
## Feature Specification
- [ ] Feature spec complete
- [ ] Spec reviewed and approved
- [ ] Documentation updated

## Implementation
- [ ] Code follows style guide
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Performance requirements met
- [ ] Accessibility requirements met

## Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance tests
- [ ] Accessibility tests

## Documentation
- [ ] API documentation
- [ ] Usage examples
- [ ] Component documentation
- [ ] Integration guide

## Review
- [ ] Self-review completed
- [ ] Documentation reviewed
- [ ] Tests reviewed
- [ ] Performance verified
```

## Questions?

If you have questions about:
- Feature specifications: Check `docs/features/_template.md`
- Code style: See `docs/guides/STYLE_GUIDE.md`
- Testing: Review `docs/guides/TESTING_GUIDE.md`
- Architecture: Read `docs/architecture/OVERVIEW.md` 