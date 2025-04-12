FROM node:18
WORKDIR /app
COPY server/ ./server/
COPY client/ ./client/
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["node", "server/server.js"]
