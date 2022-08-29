FROM node:16
WORKDIR /usr/src/bert
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
CMD [ "node", "index.js"]