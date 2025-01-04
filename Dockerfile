FROM node:20.18.1

WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./
COPY next.config.js ./
COPY tsconfig.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código
COPY . .

# Configura a porta
ENV PORT 3333

# Expõe a porta
EXPOSE 3333

# Em desenvolvimento
CMD ["npm", "run", "dev", "--", "-p", "3333"]