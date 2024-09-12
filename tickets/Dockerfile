FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev 
# only installs dependecies and not dev dependecies
COPY . .

CMD [ "npm", "start" ]