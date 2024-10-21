#!/bin/sh

# set -e

# # Wait that posgrest is available
# until pg_isready -h db -U postgres; do
#   echo "Esperando a que la base de datos esté lista..."
#   sleep 2
# done

# exec commands
npx prisma migrate deploy

npx prisma generate

npx ts-node prisma/seeders/seed.ts

yarn start
