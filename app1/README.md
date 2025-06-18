# app1 — Simple Express API with Controlled Deployment

A Node.js + Express application with production-ready Docker build and GitHub Actions-based deployment pipeline for `dev` and `prod` environments.

---

## 🚀 Deployment Overview

### ✅ Supported Features

- Controlled deployment to **dev** and **prod** environments
- Docker image versioning via **Git tags** (e.g. `v1.0.0`)
- Manual image promotion via `terraform apply`
- GitHub Actions-based pipeline:
  - Build and push Docker image to ECR
  - Save image version to AWS SSM (for `dev`)
- Safety:
  - Image overwrite protection (ECR)
  - Mandatory image tag for `prod`
  - Tag existence check in ECR before apply
- Manual trigger via GitHub Actions (`workflow_dispatch`)

---

## 🧪 Local Development

### Install Dependencies

```bash
npm install
npm run start
```

Runs the server at:  
`http://localhost:8000`

---

## 🐳 Local Docker Workflow

### Build the Docker Image

```bash
docker build -t simple-express-api .
```

### Run the Container

```bash
docker run -d -p 8000:8000 --name express-container simple-express-api
```

### Stop and Remove the Container

```bash
docker stop express-container
docker rm express-container
```

---

## 🔄 GitHub Actions Workflows

### 🔹 Build and Push to ECR

Workflow: [`deploy-app.yml`](../.github/workflows/deploy-app.yml)

Manually triggered via GitHub → Actions → "Build and push new image to ECR"

#### Required inputs:

| Name          | Description                        | Example  |
| ------------- | ---------------------------------- | -------- |
| `env`         | Target environment (`dev`, `prod`) | `prod`   |
| `version_tag` | Docker image tag (e.g. `v1.0.3`)   | `v1.0.3` |

This workflow:

- Builds and pushes Docker image to environment-specific ECR
- Saves the image tag to AWS SSM Parameter Store at `/app1/{env}/image_tag`

---

## 📦 AWS ECR Integration

All images are pushed to your environment-specific ECR repository:

- `ecr-kapset-dev` for dev
- `ecr-kapset-prod` for prod

---

## 📜 Deployment via Infrastructure Repo

Actual deployment is handled in the **infrastructure repository** (`DevOps.Practice.Infrastructure`) via `terraform-apply.yml`.

- In `dev`: Terraform picks up the latest tag from SSM automatically if not explicitly provided
- In `prod`: You must manually specify the image tag and infrastructure version tag (Git tag)

### Example `terraform apply` for dev

| Input           | Value        |
| --------------- | ------------ |
| `env`           | `dev`        |
| `infra_version` | `main`       |
| `image_tag`     | _(optional)_ |

### Example `terraform apply` for prod

| Input           | Value          |
| --------------- | -------------- |
| `env`           | `prod`         |
| `infra_version` | `v1.0.0-infra` |
| `image_tag`     | `v1.0.0`       |

---

## 🛡 Deployment Safety

- ❗ Tagged Docker images cannot be overwritten (ECR check)
- ❗ `image_tag` is **required** for production applies
- ✅ `terraform apply` verifies that Docker image exists in ECR
- ✅ `dev` deployments use SSM for auto-tag resolution if image_tag is omitted

---
