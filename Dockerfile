FROM mhart/alpine-node:14

LABEL maintainer="meshkov.ra@yandex.com"

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --ignore-optional --frozen-lockfile && yarn cache clean

ADD . /app/

EXPOSE 3000
ENV NODE_ENV 'production'

ENV DB_HOST ''
ENV DB_PORT ''
ENV DB_USERNAME ''
ENV DB_PASSWORD ''
ENV DB_NAME ''

RUN apk --update --no-cache add postgresql-client

COPY dist/ /app/dist/
