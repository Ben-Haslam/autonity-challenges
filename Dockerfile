# specify the node base image with your desired version node:<version>
FROM node:16
WORKDIR /usr/autonity
COPY package.json .
RUN npm install\
    && npm install typescript -g
COPY . .
RUN tsc
CMD ["node", "./build/main.js"]