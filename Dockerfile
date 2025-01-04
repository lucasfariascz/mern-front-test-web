FROM node:20.18.1

WORKDIR /app

# Copia apenas os arquivos de configuração primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Agora copia o resto do código (ignorando node_modules por causa do .dockerignore)
COPY . .

# Configura e expõe a porta
ENV PORT 3333
EXPOSE 3333

# Em desenvolvimento
CMD ["npm", "run", "dev", "--", "-p", "3333"]