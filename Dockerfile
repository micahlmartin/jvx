# syntax=docker/dockerfile:1

# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies needed for native modules
RUN apk add --no-cache libc6-compat curl

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci

# ---- Test Stage ----
FROM base AS test
WORKDIR /app

# Copy source
COPY . .

# Create artifacts directory
RUN mkdir -p /app/artifacts

# Set environment variables for testing
ENV NODE_ENV=test
ENV NEXT_TELEMETRY_DISABLED=1

# Run tests and checks
RUN npm run lint > /app/artifacts/lint-results.txt 2>&1 || \
    (echo "Linting failed" && cat /app/artifacts/lint-results.txt && exit 1)

RUN npx tsc --noEmit > /app/artifacts/typescript-check.txt 2>&1 || \
    (echo "Type checking failed" && cat /app/artifacts/typescript-check.txt && exit 1)

# Run tests with coverage and output in multiple formats
RUN npm run test \
    --coverage \
    --outputFile=/app/artifacts/junit.xml \
    --reporter=junit,default

# Move coverage reports to artifacts directory
RUN mkdir -p /app/artifacts/coverage && \
    cp -r coverage/* /app/artifacts/coverage/

# Generate bundle analysis if available
RUN npm run build:analyze > /app/artifacts/bundle-analysis.txt 2>&1 || true

# ---- Build Stage ----
FROM test AS builder
WORKDIR /app

# Set Next.js telemetry to disabled
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application with optimizations
RUN npm run build

# Copy build stats to artifacts if they exist
RUN if [ -d ".next/analyze" ]; then \
      cp -r .next/analyze /app/artifacts/; \
    fi

# ---- Production Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user and set permissions
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"] 