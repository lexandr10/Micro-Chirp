
FROM node:20


RUN corepack enable && corepack prepare yarn@stable --activate


WORKDIR /app


COPY package.json yarn.lock ./


RUN yarn install


COPY . .


RUN yarn db:create


RUN yarn migrate:make


EXPOSE 4000


CMD ["yarn", "dev"]
