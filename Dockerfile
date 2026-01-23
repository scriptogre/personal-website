# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built assets from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

# Start the server
CMD ["node", "./dist/server/entry.mjs"]
