# Obraz bazowy
FROM node:alpine
 
# Utwórz katalog aplikacji w kontenerze
WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 8080


CMD [ "npm", "start" ]