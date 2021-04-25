FROM balenalib/raspberrypi3-node:14-stretch-run

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8120

EXPOSE 8120

CMD [ "node", "index.js" ]
