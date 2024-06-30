FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy the .env file
COPY .env .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
