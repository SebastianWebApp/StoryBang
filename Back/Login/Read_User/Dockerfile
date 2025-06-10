FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /

COPY . .

RUN npm install

EXPOSE 4006

CMD ["npm","start"]