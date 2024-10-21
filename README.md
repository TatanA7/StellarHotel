
# Stellar Hotels API

Bienvenido a la API de Stellar Hotels, un sistema de reservas de hoteles que permite gestionar habitaciones, reservas y obtener detalles sobre disponibilidad.

## Tabla de Contenidos

- [DescripciÃ³n](#descripciÃ³n)
- [CaracterÃ­sticas](#caracterÃ­sticas)
- [TecnologÃ­as Utilizadas](#tecnologÃ­as-utilizadas)
- [InstalaciÃ³n](#instalaciÃ³n)
- [Uso](#uso)
- [Pruebas](#pruebas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## DescripciÃ³n

La API de Stellar Hotels proporciona funcionalidades para gestionar la informaciÃ³n de los hoteles, incluidas las habitaciones, las reservas y la disponibilidad. Esta API estÃ¡ diseÃ±ada para ser utilizada por desarrolladores que deseen integrar un sistema de reservas en sus aplicaciones.

## CaracterÃ­sticas

- GestiÃ³n de habitaciones
- CreaciÃ³n y gestiÃ³n de reservas
- Consultas de disponibilidad de habitaciones
- Soporte para mÃºltiples tipos de habitaciones
- Manejo de tarifas dinÃ¡micas

## TecnologÃ­as Utilizadas

- [NestJS](https://nestjs.com/) - Framework de Node.js para construir aplicaciones eficientes y escalables.
- [Prisma](https://www.prisma.io/) - ORM para bases de datos.
- [PostgreSQL](https://www.postgresql.org/) - Sistema de gestiÃ³n de bases de datos relacional.
- [GraphQL](https://graphql.org/) - Lenguaje de consulta para APIs.

## InstalaciÃ³n

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/stellar-hotels.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd stellar-hotels
   ```

3. Instala las dependencias:

   ```bash
   yarn install
   ```

4. Configura el archivo `.env` con tus variables de entorno:

   ```bash
   cp .env.example .env
   ```

   AsegÃºrate de completar las variables necesarias, como las credenciales de la base de datos.

5. Ejecuta las migraciones de Prisma:

   ```bash
   npx prisma migrate dev
   ```

## Uso

Para iniciar el servidor de desarrollo, utiliza el siguiente comando:

```bash
yarn start:dev
```

La API estarÃ¡ disponible en `http://localhost:3000/graphql`.


## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
yarn test
```

Las pruebas estÃ¡n organizadas y se ejecutarÃ¡n usando Jest.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama para tus cambios:

   ```bash
   git checkout -b feature/nueva-caracteristica
   ```

3. Realiza tus cambios y haz commit:

   ```bash
   git commit -m 'AÃ±adir nueva caracterÃ­stica'
   ```

4. Sube tus cambios:

   ```bash
   git push origin feature/nueva-caracteristica
   ```

5. Abre un pull request.

## Licencia

Este proyecto estÃ¡ bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para mÃ¡s detalles.
