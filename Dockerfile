FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN mkdir -p dist

RUN npm run build

EXPOSE 3050

CMD ["npm", "start"]
