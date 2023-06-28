# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (if available).
COPY package*.json ./

# Install production dependencies.
RUN npm ci --only=production

# Copy local code to the container image.
COPY . .

# Set node command as the entrypoint
ENTRYPOINT [ "node", "jwt_hash_decrypt.js" ]