# 1. Etapa de construcción: cliente y servidor Angular
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app/pronuncia_frontend/

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Build del cliente y del servidor
RUN npm run build --prod
RUN ls -l /app/frontend/dist/vocab_app/server/
# 2. Etapa de producción: ejecutar servidor Express
FROM node:20-alpine

# Crear directorio de trabajo en el contenedor
WORKDIR /app/pronuncia_frontend/

# Copiar los artefactos compilados desde el builder
COPY --from=builder /app/pronuncia_frontend/dist/vocab_app ./dist
RUN ls -l ./dist
COPY --from=builder /app/pronuncia_frontend/package*.json ./

# Instalar solo dependencias necesarias para producción
RUN npm install --only=production

# Exponer el puerto
EXPOSE 4000

# Comando para iniciar el servidor
ENTRYPOINT  ["node", "dist/server/server.mjs"]
