FROM node:lts-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 8000

CMD ["node", "src/server.js"]
