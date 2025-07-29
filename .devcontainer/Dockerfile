# Usamos la imagen base de Node.js 18 que coincide con tu proyecto
FROM node:18-bookworm

# Argumentos para el usuario no-root
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Creamos el directorio de trabajo
WORKDIR /workspace

# Instalar cliente de PostgreSQL para que `pg_isready` funcione en el postCreateCommand
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends postgresql-client

# Copiamos package.json y package-lock.json e instalamos dependencias
COPY package*.json ./
RUN npm install