FROM node:current-alpine AS frontend

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run frontend:build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=frontend /app/dist ./

EXPOSE 80
