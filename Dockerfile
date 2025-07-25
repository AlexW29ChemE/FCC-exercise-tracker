# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
# We do this separately to leverage Docker's caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies) because 'tsc' is a devDependency
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the TypeScript application
# This assumes you have a "build" script in your package.json
RUN npm run build

# Expose the port your app runs on (your current project uses process.env.PORT, default 3000)
EXPOSE 3000

# Define the command to run your app
# Your package.json 'start' script points to 'dist/app.js'
CMD [ "npm", "start" ]