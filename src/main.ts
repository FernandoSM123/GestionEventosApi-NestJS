import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //configuracion para utilizar sesiones
  app.use(
    session({
      secret: 'your_secret_key', // Cambia esto por una clave segura
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // Configuración de la cookie (opcional)
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
