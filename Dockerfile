FROM node:16
WORKDIR /usr/src/bert
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
CMD [ "node", "index.js"]