# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale todas as dependências (incluindo as devDependencies)
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Crie o diretório dist antes de copiar o arquivo .env
RUN mkdir -p dist

# Compilar o projeto TypeScript
RUN npm run build

# Definir variáveis de ambiente para TypeORM apontando para a pasta dist
ENV TYPEORM_ENTITIES=dist/app/entities/*.js
ENV TYPEORM_MIGRATIONS=dist/database/migrations/*.js

# Exponha a porta que sua aplicação vai utilizar
EXPOSE 3050

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
