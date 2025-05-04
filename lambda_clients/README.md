# AWS Lambda Clients

This folder contains source code for AWS Lambda functions.

---

## Structure

Each Lambda function lives in its own directory inside the `lambda_clients/<project>/` folder.  
Example:

```tree
lambda_clients
├───analytics
|   ├───analytics-data-getter
|   |   ├───index.js
|   |   └───...
|   ├───analytics-db-init
|   |   ├───index.js
|   |   └───...
|   └───...
├───...
└───README.md ← you are here

```

---

## Naming Convention

- **The name of the folder must exactly match the `function_name` defined in Terraform**.
- Example:
  - Folder: `lambda_clients/analytics/analytics-data-getter`
  - Terraform: `function_name = "analytics-data-getter"`

This ensures the GitHub Actions workflow can correctly update the corresponding function in AWS.

---

## Deployment Workflow

Lambda code updates are handled automatically using the [update-lambda-clients.yml](../.github/workflows/update-lambda-clients.yml) GitHub Actions workflow.

### Key Features:

- The workflow runs automatically on changes to any files in `lambda_clients/**`, or can be triggered manually via the Actions tab.
- It zips **all Lambda functions** in `lambda_clients/**` and updates each one in AWS using `aws lambda update-function-code`.
- There's **no need to track changed functions** — all are updated on each run for simplicity and reliability.

---

## Adding a New Lambda

1. Create a folder: `lambda_clients/<context>/<function_name>`
2. Add an `index.js` file (must export `handler`)
3. Make sure the folder name matches the Terraform `function_name`
4. Push your changes to `main` – the workflow will trigger automatically and deploy your function

---
