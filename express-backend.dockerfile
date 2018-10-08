FROM node:latest

LABEL author="Alberto Franco"

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8000

CMD [ "node", "/app/source/app.js" ]
