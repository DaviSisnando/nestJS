FROM node:14
EXPOSE 3001

WORKDIR .
COPY . .

RUN npm install
ENTRYPOINT npm run start:dev