# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências do projeto
RUN npm install --production

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Crie o diretório dist antes de copiar o arquivo .env
RUN mkdir -p dist

# Compilar o projeto TypeScript (se necessário)
RUN npm run build

# Exponha a porta que sua aplicação vai utilizar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
