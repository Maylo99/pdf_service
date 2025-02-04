# Fastify PDF Server

## Build the Docker Image and Run the Container
To build the Docker image and run the Fastify server in the container, use the following commands:

```bash
# Build the Docker image
docker build --platform linux/amd64 -t fastify-pdf-server .

# Run the Docker container
docker run --platform=linux/amd64 -p 3000:3000 fastify-pdf-server
```

## Start the Server Locally (Without Docker)
If you want to start the server locally without Docker, use the following command:
```bash
npm run start
```
# Note: If you want to run it locally, make sure to uncomment the following line in server.js:
// executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
