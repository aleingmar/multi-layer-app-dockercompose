# Imagen base
FROM node:18

# Crear carpeta de trabajo
WORKDIR /usr/src/app

# Copiar archivos
COPY app.js .

# Instalar express
RUN npm init -y && npm install express mongoose cors

# Exponer el puerto 3000 (no lo expone realmente es documentativo)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "app.js"]