# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a lightweight web server to serve the built files
RUN npm install -g serve

# Set the command to run the web server on port 5000
CMD ["serve", "-s", "dist", "-l", "5000"]

# Expose port 5000
EXPOSE 5000
