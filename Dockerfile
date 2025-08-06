FROM node:22
WORKDIR /app
COPY server/ ./server/
COPY client/ ./client/
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["node", "server/server.js"]
