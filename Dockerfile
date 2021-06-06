FROM mhart/alpine-node:14

LABEL maintainer="meshkov.ra@yandex.com"

RUN apk add --update git
RUN git clone https://github.com/Romjkez/mini-backend.git

WORKDIR /mini-backend

RUN yarn install --ignore-optional --frozen-lockfile && yarn build && yarn cache clean

ADD . /mini-backend/

EXPOSE 3000

