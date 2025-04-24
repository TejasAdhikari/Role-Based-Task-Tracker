# This line specifies the base image for the Docker image. 
# In this case, it uses the official Node.js 16 image from Docker Hub. 
# This base image includes Node.js 16 and npm (Node Package Manager).
FROM node:16

# This line sets the working directory inside the Docker container to /app.
# All subsequent commands will be run from this directory.
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# This line copies the contents of the frontend directory on 
# the host machine to the /app directory inside the Docker container. 
# The . at the end specifies the destination directory inside the container.
COPY . .

# This line runs the npm install command inside the Docker container to install 
# the Node.js dependencies listed in the package.json file. 
RUN npm install

# Expose port 3000 for the React development server
EXPOSE 3000

# This line specifies the command to run when the Docker container starts. 
# In this case, it runs the npm start command, which starts the React development server. 
CMD ["npm", "start"]