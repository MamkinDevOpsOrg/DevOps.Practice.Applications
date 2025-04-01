# Simple Express API

A basic API application built with Node.js and Express.

---

## Running Locally

### Install Dependencies

```bash
npm install
npm run start
```

## Running with Docker

### Build the Docker Image

```bash
docker build -t simple-express-api .
```

### Run the Container

```bash
docker run -d -p 8000:8000 --name express-container simple-express-api
```

The server will be available at:
`http://localhost:8000`

### Stop and Remove the Container

```bash
docker stop express-container
docker rm express-container
```

### Push image to AWS ECR

Pushing images to AWS ECR is implemented as github workflow in [deploy-to-ecr.yml](../.github/workflows/deploy-to-ecr.yml)
