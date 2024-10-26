FROM node:18.20.4-alpine3.20

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

# instruções para subir a imagem
