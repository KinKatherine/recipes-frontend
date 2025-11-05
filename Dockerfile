# Stage 1: build
FROM node:22-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install deps (uses package-lock.json if present)
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: runtime using a small Node static server (no nginx)
FROM node:22-alpine AS production
WORKDIR /app

# Install a tiny static server with SPA fallback
RUN npm install -g serve

# Copy only built static files
COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
