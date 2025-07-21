
FROM node:18-alpine


RUN corepack enable && corepack prepare yarn@stable --activate


WORKDIR /usr/src/app


COPY package.json yarn.lock ./


RUN yarn install --frozen-lockfile


COPY . .



EXPOSE 4000


CMD ["yarn", "dev"]
