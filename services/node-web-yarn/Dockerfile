FROM node:20-slim
WORKDIR /app

ARG CLOUDSMITH_API_KEY
ARG CLOUDSMITH_WORKSPACE
ARG CLOUDSMITH_REPOSITORY

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json .
RUN yarn config set npmRegistryServer https://npm.cloudsmith.io/${CLOUDSMITH_WORKSPACE}/${CLOUDSMITH_REPOSITORY}/
RUN yarn config set 'npmRegistries["https://npm.cloudsmith.io/${CLOUDSMITH_WORKSPACE}/${CLOUDSMITH_REPOSITORY}/"].npmAuthIdent' "token:${CLOUDSMITH_API_KEY}"
RUN yarn config set 'npmRegistries["https://npm.cloudsmith.io/${CLOUDSMITH_WORKSPACE}/${CLOUDSMITH_REPOSITORY}/"].npmAlwaysAuth' true

RUN YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn install --verbose

COPY server.js .
EXPOSE 3000
CMD ["yarn", "start"]
