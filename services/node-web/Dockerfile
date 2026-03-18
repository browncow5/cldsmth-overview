FROM node:20-slim

WORKDIR /app

# Configure npm to pull from Cloudsmith upstream proxy
ARG CLOUDSMITH_API_KEY
ARG CLOUDSMITH_WORKSPACE
ARG CLOUDSMITH_REPOSITORY
ARG CLOUDSMITH_SERVICE

RUN npm config set registry https://npm.cloudsmith.io/$CLOUDSMITH_WORKSPACE/$CLOUDSMITH_REPOSITORY/
RUN npm config set https://npm.cloudsmith.io/$CLOUDSMITH_WORKSPACE/$CLOUDSMITH_REPOSITORY/:_authToken=${CLOUDSMITH_API_KEY}

COPY package.json .
RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["npm", "start"]
