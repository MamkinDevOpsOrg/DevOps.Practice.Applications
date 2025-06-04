# app1 — Simple Express API with Controlled Deployment

A Node.js + Express application with production-ready Docker build and GitHub Actions-based deployment pipeline for `dev` and `prod` environments.

---

## 🚀 Deployment Overview

### ✅ Supported Features

- Controlled deployment to **dev** and **prod** environments
- Docker image versioning via **Git tags** (e.g. `v1.0.0`)
- Four modes of operation:
  - `build_and_push` — Build Docker image and push to ECR
  - `build_and_deploy` — Build, push and deploy to EC2
  - `deploy_only` — Deploy existing image from ECR
  - `rollback` — Redeploy a previous image version
- Safety:
  - Image overwrite protection (for tagged builds)
  - Mandatory version tag for prod
  - Existence check for image before `deploy_only` or `rollback`
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

## 🔄 GitHub Actions Deployment

Deployment is handled by [`deploy-app.yml`](../.github/workflows/deploy-app.yml)

### Triggering a Deployment

Use GitHub → Actions → `Deploy app1 to environment` → `Run workflow`.

#### Required inputs:

| Name          | Description                         | Example            |
| ------------- | ----------------------------------- | ------------------ |
| `env`         | Target environment (`dev`, `prod`)  | `prod`             |
| `version_tag` | Docker tag (`v1.0.3`, `dev-latest`) | `v1.0.3`           |
| `mode`        | Deployment mode                     | `build_and_deploy` |

### Example: Prod release flow

```bash
# Tag the current commit
git tag v1.0.0
git push origin v1.0.0
```

Then in GitHub Actions:

- `env = prod`
- `version_tag = v1.0.0`
- `mode = build_and_deploy`

This will:

- Checkout snapshot for `v1.0.0`
- Build and push Docker image
- Deploy image to EC2 instance using SSM

---

## 📦 AWS ECR Integration

All images are pushed to your environment-specific ECR repository:

- `ecr-kapset-dev` for dev
- `ecr-kapset-prod` for prod

---

## 🛡 Deployment Safety

- ❗ Tagged images (e.g. `v1.0.0`) **cannot be overwritten**
- ❗ `version_tag` is **required for production**
- ✅ Deployment checks ECR for image existence before attempting deploy

---
