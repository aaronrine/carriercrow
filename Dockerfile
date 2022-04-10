FROM node:17.8-alpine3.14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY .env .
COPY src ./src
CMD node --experimental-fetch src/index.js