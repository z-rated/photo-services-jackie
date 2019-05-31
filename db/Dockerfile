FROM node:latest

RUN mkdir -p /db

WORKDIR /db

COPY . /db

RUN npm install faker
RUN npm install mongoose

CMD ["node", "generateData.js"]