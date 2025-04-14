# AWS Lambda Clients

This folder contains source code for AWS Lambda functions.

---

## Structure

Each Lambda function lives in its own directory inside the `lambda_clients/<project>/` folder.  
Example:

```tree
lambda_clients
├───app1
|   ├───trigger_cpu
|   |   └───index.js
|   └───trigger_mem
|       └───index.js
└───README.md ← you are here

```

---

## Naming Convention

- **The name of the folder must exactly match the `function_name` defined in Terraform**.
- Example:
  - Folder: `lambda_clients/app1/trigger_cpu_load`
  - Terraform: `function_name = "trigger_cpu_load"`

This ensures the GitHub Actions workflow can correctly update the corresponding function in AWS.

---

## Deployment Workflow

Lambda code updates are handled automatically using the [update-lambda-clients.yml](../.github/workflows/update-lambda-clients.yml) GitHub Actions workflow.

### Key Features:

- Runs on changes to files under `lambda_clients/**` or manually via the Actions tab
- Uses a Bash script [generate-matrix-for-lambda-clients.sh](../.github/workflows/update-lambda-clients.yml) to detect which Lambda functions were modified
- Zips each modified function and updates it in AWS via `aws lambda update-function-code`

---

## Adding a New Lambda

1. Create a folder: `lambda_clients/<context>/<function_name>`
2. Add an `index.js` file (must export `handler`)
3. Make sure the folder name matches the Terraform `function_name`
4. Push your changes to `main` – the workflow will trigger automatically

---
