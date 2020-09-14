FROM node:current-alpine

RUN npm install -g pouchdb-server

ENTRYPOINT ["pouchdb-server"]

CMD ["--host", "0.0.0.0"]
