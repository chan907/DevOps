# Multi-stage Dockerfile
# Stage 1 builds the React frontend, Stage 2 runs the Node.js backend
# and serves the built React files as static assets

# ── Stage 1: Build React Frontend ───────────────────────────────────────────
FROM node:18-alpine AS frontend-build
WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and build the React app
COPY . .
ARG REACT_APP_API_URL=          # Optional: pass backend API URL at build time
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build               # Outputs static files to /app/build

# ── Stage 2: Production Node.js Server ──────────────────────────────────────
FROM node:18-alpine
WORKDIR /app

# Install only production backend dependencies (no devDependencies)
COPY server/package*.json ./
RUN npm install --omit=dev

# Copy backend source code
COPY server/ .

# Copy the React build output from Stage 1 into the backend's public folder
# Express will serve these static files
COPY --from=frontend-build /app/build ./public

EXPOSE 8000                     # The port Express listens on (mapped in docker-compose)
CMD ["node", "app.js"]          # Start the Express server
