/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as csrf from 'csurf'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: ['https://stellarhotel.onrender.com','http://localhost:3000'],  // o cualquier dominio que estés usando
    credentials: true,  // Si estás usando cookies o autenticación
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
bootstrap();
