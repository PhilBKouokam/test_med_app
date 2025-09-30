FROM node:20.19.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8181
CMD ["node", "index.js"]
