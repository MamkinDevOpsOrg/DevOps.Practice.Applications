# DevOps Apps Monorepo

This repository is a **monorepo** that contains application code used for practicing DevOps skills.

It is designed to support:

- Dockerization
- GitHub Actions workflows
- ECR/ECS deployments
- ...

Currently it contains:

- [`app1`](./app1) — A simple Express.js API
- [`lambda_clients`](./lambda_clients) — Code for AWS Lambda
- [`k6`](./k6) — Load testing scripts for APIs and services

> More applications (e.g. `app2`, `app3`, etc.) will be added over time as needed.

---

## Project Structure

- 📁 `.github/workflows/` - CI/CD pipelines (e.g., build and push to ECR)
- 📁 `app1/` - Simple Express API (Node.js + Docker)
- 📁 `k6/` - Load testing scripts using k6 and webpack
- 📁 `lambda_clients/` - Code for AWS Lambda Functions
- 📄 `README.md` ← you are here

---

## How to Get Started with `app1`

Check the [README for `app1`](./app1/README.md) for instructions on:

- Running locally
- Building with Docker
- Pushing images to AWS ECR

---

## How to Get Started with `lambda_clients`

Check the [README for `lambda_clients`](./lambda_clients/README.md) for details on:

- Project structure and naming convention
- How Lambda function code is managed
- Automatic deployment via GitHub Actions workflow with Bash-based matrix generation

---

## How to Get Started with `k6`

Check the [README for `k6`](./k6/README.md) for instructions on:

- Installing and setting up k6
- Building bundled test scripts
- Running load tests with faker-generated data
