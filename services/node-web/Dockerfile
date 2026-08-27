FROM node:20-slim

WORKDIR /app

ARG CLOUDSMITH_WORKSPACE
ARG CLOUDSMITH_REPOSITORY

COPY package.json .

# The API key is mounted as a BuildKit secret and the npmrc holding it is removed
# in the same layer, so no credential reaches the published image.
RUN --mount=type=secret,id=cloudsmith_api_key \
    npm config set registry https://npm.cloudsmith.io/${CLOUDSMITH_WORKSPACE}/${CLOUDSMITH_REPOSITORY}/ && \
    npm config set //npm.cloudsmith.io/${CLOUDSMITH_WORKSPACE}/${CLOUDSMITH_REPOSITORY}/:username token && \
    npm config set //npm.cloudsmith.io/${CLOUDSMITH_WORKSPACE}/${CLOUDSMITH_REPOSITORY}/:_password \
      "$(tr -d '\n' < /run/secrets/cloudsmith_api_key | base64 -w0)" && \
    npm install --verbose && \
    rm -f ~/.npmrc

COPY server.js .

EXPOSE 3000

CMD ["npm", "start"]
