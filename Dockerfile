FROM node:alpine
WORKDIR /usr/src/app 
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]





