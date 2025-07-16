FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
