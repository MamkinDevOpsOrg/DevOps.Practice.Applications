#!/bin/bash

# -----------------------------------------------------------------------------
# generate-matrix-for-lambda-clients.sh
#
# This script scans the lambda_clients directory for changed lambda function
# folders (based on a git diff between HEAD and origin/main), extracts unique
# top-level function paths (e.g., lambda_clients/app1/trigger_cpu), and outputs
# a GitHub Actions-compatible JSON matrix with each function's name and path.
#
# The resulting JSON is used in a GitHub Actions job matrix to selectively 
# zip and update only those Lambda functions that have changed.
# -----------------------------------------------------------------------------

echo -n '{"include": ['

FIRST=true

# Get changed lambda function directories
CHANGED_DIRS=$(git diff --name-only origin/main...HEAD | grep '^lambda_clients/' | cut -d/ -f1-3 | sort -u)

for dir in $CHANGED_DIRS; do
  FUNC_NAME=$(basename "$dir")
  FUNC_PARENT=$(basename "$(dirname "$dir")")
  LAMBDA_NAME="${FUNC_NAME}"
  LAMBDA_PATH="$dir"

  $FIRST || echo -n ","
  echo -n "{\"name\": \"$LAMBDA_NAME\", \"path\": \"$LAMBDA_PATH\"}"
  FIRST=false
done

echo ']}'
