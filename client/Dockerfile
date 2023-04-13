FROM node:18.15.0-alpine3.17

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json ./
COPY ./ ./

RUN npm install -g pnpm
RUN pnpm i

CMD ["pnpm", "start"]