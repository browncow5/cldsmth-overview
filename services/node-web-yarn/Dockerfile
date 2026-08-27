FROM node:20-slim
WORKDIR /app

ARG CLOUDSMITH_WORKSPACE
ARG CLOUDSMITH_REPOSITORY

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json .

# The API key is mounted as a BuildKit secret and the yarnrc holding it is removed
# in the same layer, so no credential reaches the published image.
RUN --mount=type=secret,id=cloudsmith_api_key \
    REGISTRY="https://npm.cloudsmith.io/${CLOUDSMITH_WORKSPACE}/${CLOUDSMITH_REPOSITORY}/" && \
    TOKEN="$(tr -d '\n' < /run/secrets/cloudsmith_api_key)" && \
    { echo "npmRegistryServer: \"$REGISTRY\""; \
      echo "npmRegistries:"; \
      echo "  \"$REGISTRY\":"; \
      echo "    npmAuthIdent: \"token:$TOKEN\""; \
      echo "    npmAlwaysAuth: true"; \
    } > ~/.yarnrc.yml && \
    YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn install --inline-builds && \
    rm -f ~/.yarnrc.yml && \
    echo "=== Package Sources ===" && \
    grep "resolution:" yarn.lock

COPY server.js .
EXPOSE 3000
CMD ["yarn", "start"]
