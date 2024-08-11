# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install --production

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compilar o projeto TypeScript (se necessário)
RUN yarn build

# Exponha a porta que sua aplicação vai utilizar
EXPOSE 4666

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
