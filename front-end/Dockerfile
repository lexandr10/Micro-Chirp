FROM node:20

RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .


EXPOSE 3000

CMD ["yarn", "dev"]
