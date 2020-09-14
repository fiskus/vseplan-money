FROM node:current-alpine

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run server:build

EXPOSE 3001

CMD ["npm", "run", "server:dev:start"]
