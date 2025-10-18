# Use official Node.js 14 image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose your backend port
EXPOSE 8181

# Run the server
CMD ["node", "index.js"]