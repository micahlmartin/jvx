# Docker Production Guide

## Overview
This guide explains how to build and run the production Docker image for our Next.js application.

## Prerequisites
- Docker installed on your system
- Node.js 20.x LTS (for local development)
- Access to the application's container registry

## Building the Production Image

```bash
# Build the production image
docker build -t jviz:production .

# Build with platform specification (if needed)
docker build --platform linux/amd64 -t jviz:production .
```

## Running the Production Container

```bash
# Run the container
docker run -p 3000:3000 jviz:production

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL=your_database_url \
  jviz:production
```

## Environment Variables
The following environment variables can be set:
- `NODE_ENV`: Set to 'production' by default
- `PORT`: Application port (default: 3000)
- Add other environment variables as needed

## Security Considerations
- The application runs as non-root user 'nextjs'
- Production build excludes development dependencies
- Multi-stage build minimizes attack surface
- Dockerfile uses explicit version tags

## Optimization Features
- Multi-stage build process
- Optimized layer caching
- Minimal production image size
- Development files excluded via .dockerignore

## Deployment
1. Build the production image
2. Tag the image for your registry
3. Push to your container registry
4. Deploy using your preferred orchestration tool

Example:
```bash
# Tag image
docker tag jviz:production your-registry.com/jviz:production

# Push to registry
docker push your-registry.com/jviz:production
```

## Troubleshooting
1. **Build Failures**
   - Verify Node.js version compatibility
   - Check for missing build dependencies
   - Ensure all required files are not in .dockerignore

2. **Runtime Issues**
   - Check container logs: `docker logs [container_id]`
   - Verify environment variables
   - Ensure ports are properly mapped

## Version Information
- Node.js: 20.x LTS
- Base Image: node:20-alpine
- Next.js: Latest stable version

## Additional Resources
- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md) 