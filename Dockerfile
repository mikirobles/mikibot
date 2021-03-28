FROM node:14

WORKDIR /miki-bot
COPY . .
RUN npm install
CMD [ "node", "index.js" ]
