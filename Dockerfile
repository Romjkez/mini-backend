FROM node:14

LABEL maintainer="meshkov.ra@yandex.com"

WORKDIR /app

ADD package.json yarn.lock /app/

RUN npm ci

ADD . /app/

EXPOSE 3000
ENV NODE_ENV 'production'

ENV DB_HOST ''
ENV DB_PORT ''
ENV DB_USERNAME ''
ENV DB_PASSWORD ''
ENV DB_NAME ''


CMD ./scripts/start.sh
