FROM node:19

WORKDIR /index

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start"]