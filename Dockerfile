FROM node:lts-alpine
RUN npm install -g serve
WORKDIR /Waterloo-tennis-club
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=4200
EXPOSE 4200

CMD ["serve", "./dist/wtc"]
