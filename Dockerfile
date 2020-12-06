FROM node:lts-alpine

ENV NODE_ENV production

COPY package.json package-lock.json ./

COPY dist dist

RUN set -x && npm ci

CMD [ "node", "dist/main.js" ]
