# This line specifies the base image for the Docker image.
# In this case, it uses the official Node.js 16 image.
FROM node:16

# This line sets the working directory inside the Docker container.
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make sure data directory exists
RUN mkdir -p data
# Create initial users.json file with default users
RUN echo '[ { "id": "1", "name": "Tejas", "role": "submitter" }, { "id": "2", "name": "Chenwei", "role": "approver" }, { "id": "3", "name": "Donald", "role": "submitter" } ]' > data/users.json
# Create empty tasks.json file if needed
RUN echo '[]' > data/tasks.json

# This line specifies the port that will be exposed by the container
EXPOSE 5000

# This line specifies the command to run when the Docker container starts.
# In this case, it runs your Node.js server.
CMD ["npm", "start"]