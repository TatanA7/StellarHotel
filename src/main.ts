/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as csrf from 'csurf'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(cookieParser());
  const csrfProtection = csrf({ cookie: true });
  app.use(csrfProtection);

  // Middleware para enviar el token CSRF en las cookies
  app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
      httpOnly: false, // Permitir acceso al token desde el cliente
      secure: process.env.NODE_ENV === 'production', // Solo si estás en producción
    });
    next();
  });
  app.enableCors({
    origin: ['https://stellarhotel.onrender.com'],  // o cualquier dominio que estés usando
    credentials: true,  // Si estás usando cookies o autenticación
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
bootstrap();
