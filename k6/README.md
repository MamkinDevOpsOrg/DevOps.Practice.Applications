# k6 Load Testing Scripts

This folder contains load testing scripts for APIs and services, built with [k6](https://grafana.com/docs/k6/latest/).

---

## Requirements

- [k6](https://grafana.com/docs/k6/latest/set-up/) must be installed locally.
- Node.js (to build the bundled test files).

---

## Project Structure

- 📁 `src/` — Source scripts written in modern JavaScript (with `faker`, `uuid`, etc.).
- 📁 `dist/` — Bundled scripts ready to be run by k6.
- 📄 `webpack.config.js` — Webpack configuration to bundle scripts and dependencies for k6.
- 📄 `package.json` — Project dependencies and build/run scripts.

---

## Why Webpack?

k6 doesn't support Node.js modules (`faker`, `uuid`, etc.) natively.  
Webpack bundles all dependencies and the code into a single compatible JavaScript file that k6 can execute.

---

## Common Commands

```bash
# Install dependencies
npm install

# Build scripts
npm run build

# Run the load test
npm run load:rds
```
