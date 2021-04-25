FROM balenalib/raspberrypi3-node:14-stretch-run

COPY . .

CMD [ "node", "index.js" ]