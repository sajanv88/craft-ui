# Stage 1: Build the application
FROM node:23-alpine3.20 AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the application
FROM node:23-alpine3.20 AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/node_modules /app/node_modules

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "/app/.output/server/index.mjs"]
