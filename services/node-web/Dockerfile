FROM node:20-slim

WORKDIR /app

# Configure npm to pull from Cloudsmith upstream proxy
ARG CLOUDSMITH_API_KEY
RUN npm config set registry https://npm.cloudsmith.io/red-acme-inc/cldsmth-overview/

COPY package.json .
RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["npm", "start"]
