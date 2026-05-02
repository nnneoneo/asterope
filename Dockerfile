FROM node:22-slim AS build

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

FROM node:22-slim AS production

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4208

# Copy build output from build stage
COPY --from=build /app/.output ./.output

# Create data directory for persistence
RUN mkdir -p /app/data

EXPOSE 4208

# Start the application
CMD ["node", ".output/server/index.mjs"]
