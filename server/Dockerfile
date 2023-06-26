FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

# all config files
COPY *.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 9000

ENTRYPOINT ["yarn", "start:prod"]