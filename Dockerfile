FROM node:10.16.1-alpine

ENV SHELL=/bin/bash
RUN apk add --no-cache bash

WORKDIR /app

COPY package-lock.json package-lock.json
COPY package.json package.json

RUN apk --no-cache add --virtual install-dependencies \
    g++ gcc libgcc libstdc++ linux-headers make python && \
    npm install node-gyp -g && \
    npm install

COPY . .
