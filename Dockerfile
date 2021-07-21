FROM node:14-alpine as frontend-builder

WORKDIR /app

COPY ./client/package.json ./
COPY ./client/yarn.lock ./

RUN yarn --prod

COPY ./client ./

RUN yarn build

FROM node:14-alpine as backend-builder

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn 

COPY ./backpack.config.js ./
COPY ./tsconfig.json ./
COPY ./src ./src

RUN yarn build

FROM node:14-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn --prod

COPY --from=frontend-builder /app/build ./client/build 
COPY --from=backend-builder /app/build ./build 


CMD [ "yarn", "start" ]