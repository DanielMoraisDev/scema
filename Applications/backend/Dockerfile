# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install ALL dependencies (including devDependencies like typescript)
RUN npm ci

# Copy source code
COPY . .

# Build the TypeScript code (creates /app/dist)
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy compiled JS from the builder stage
COPY --from=builder /app/dist ./dist

ENV PORT=3000
EXPOSE 3000

# Start the compiled JavaScript
CMD ["node", "dist/server.js"]