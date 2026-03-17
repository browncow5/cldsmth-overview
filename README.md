# Cloudsmith Demo — Dual Container Microservices

A minimal demo showing two microservices built with GitHub Actions, pulling dependencies from Cloudsmith (upstream proxy) and pushing Docker images to Cloudsmith's Docker registry.

## Architecture

```
┌──────────────┐       ┌──────────────┐
│  Node/Express │──────▶│  Python/Flask │
│  Web Server   │  HTTP │  API Server   │
│  :3000        │       │  :5000        │
└──────────────┘       └──────────────┘
```

- **Node Web** (`services/node-web`) — Express web server serving an HTML page that calls the Python API
- **Python API** (`services/python-api`) — Flask API returning JSON data

## Cloudsmith Integration

| Touchpoint        | Description                                            |
| ----------------- | ------------------------------------------------------ |
| **npm proxy**     | Node deps pulled from `npm.cloudsmith.io/red-acme-inc/cldsmth-overview/` |
| **PyPI proxy**    | Python deps pulled from `dl.cloudsmith.io/.../python/simple/` |
| **Docker registry** | Built images pushed to `docker.cloudsmith.io/red-acme-inc/cldsmth-overview/` |

## Prerequisites

1. A Cloudsmith account with the `red-acme-inc/cldsmth-overview` repo
2. **Upstream proxies configured** in Cloudsmith:
   - PyPI upstream → `https://pypi.org/simple/`
   - npm upstream → `https://registry.npmjs.org/`
3. GitHub repo secrets:
   - `CLOUDSMITH_API_KEY` — your Cloudsmith API key
   - `CLOUDSMITH_USER` — your Cloudsmith username (for Docker login)

## Local Development

```bash
# Set your API key
export CLOUDSMITH_API_KEY=your-api-key-here

# Build and run both services
docker compose up --build

# Visit http://localhost:3000
```

## CI/CD (GitHub Actions)

On push to `main`, the workflow:

1. Builds both Docker images (pulling deps from Cloudsmith)
2. Pushes tagged images to Cloudsmith's Docker registry

The workflow runs on PRs too (build-only, no push).

## Project Structure

```
├── .github/workflows/
│   └── build-and-push.yml    # GitHub Actions CI/CD
├── services/
│   ├── node-web/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── server.js
│   └── python-api/
│       ├── Dockerfile
│       ├── app.py
│       └── requirements.txt
├── docker-compose.yml
└── README.md
```
