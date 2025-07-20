
FROM node:20-alpine

WORKDIR /app


COPY package.json yarn.lock ./
RUN yarn install

COPY . .




EXPOSE 4000


CMD yarn migrate:latest && yarn dev
