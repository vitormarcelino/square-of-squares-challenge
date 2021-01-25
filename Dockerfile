FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
RUN npm install -g pm2 @adonisjs/cli --silent
COPY . .
RUN cp docker.env .env
EXPOSE 8888
CMD [ "pm2-runtime", "ecosystem.config.js"]