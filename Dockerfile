FROM node:16
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
CMD [ "node", "index.js"]