FROM node:16.14.2-alpine AS common-build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

# final-stage
FROM node:16.14.2-alpine

WORKDIR /app

COPY --from=common-build-stage /app .

COPY . . 
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]