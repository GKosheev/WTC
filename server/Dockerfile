FROM node:16.7.0
WORKDIR /wtc-server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build \
&& npm rebuild bcrypt --build-from-source
ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]
