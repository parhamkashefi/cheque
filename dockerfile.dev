FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm config set registry https://mirror-npm.runflare.com

RUN corepack enable


COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["yarn", "start:dev"]