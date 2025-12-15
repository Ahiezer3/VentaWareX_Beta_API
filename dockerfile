FROM --platform=linux/amd64 node:22.11.0

WORKDIR /app

# Establecer la zona horaria del contenedor en UTC
RUN ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
    
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]