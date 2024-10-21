# Usar la imagen oficial de Node.js 18 como base
FROM node:18

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install --frozen-lockfile

# Copiar el resto de la aplicación
COPY . .

# Copiar el script de espera
COPY wait-for-db.sh ./

# Hacer el script ejecutable
RUN chmod +x wait-for-db.sh

# Compilar la aplicación TypeScript a JavaScript
RUN yarn build

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar el script de espera y luego iniciar la aplicación
CMD ["./wait-for-db.sh"]
