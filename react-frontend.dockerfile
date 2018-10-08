FROM node:latest

LABEL author="Alberto Franco"

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
