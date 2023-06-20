FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 6881

CMD ["npm", "start"]
