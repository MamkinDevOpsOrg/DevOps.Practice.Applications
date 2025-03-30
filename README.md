# Simple Express API

A basic API application built with Node.js and Express.

---

## Running Locally

```bash
cd app1
```

### Install Dependencies

```bash
npm install
npm run start
```

## Running with Docker

```bash
cd app1
```

### Build the Docker Image

```bash
docker build -t simple-express-api .
```

### Run the Container

```bash
docker run -d -p 8000:8000 --name express-container simple-express-api
```

The server will be available at:
`http://localhost:3000`

### Stop and Remove the Container

```bash
docker stop express-container
docker rm express-container
```
