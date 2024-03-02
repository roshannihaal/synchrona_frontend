FROM node:20.11.0-buster-slim as base

FROM base as development

WORKDIR /usr/src/app

COPY package.*json .

RUN npm install

COPY . .

CMD ["npm","run","start"]

FROM base as production

WORKDIR /usr/src/app

COPY package.*json .

RUN npm install --omit=dev --ignore-scripts

COPY . .

CMD ["npm","run","build"]

