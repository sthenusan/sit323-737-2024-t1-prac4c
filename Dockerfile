# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /Users/thenusan/Documents/T1_2024/Cloud/sit323-737-2024-t1-prac4c

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
