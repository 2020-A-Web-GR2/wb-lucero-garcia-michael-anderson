import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar cosas en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  const express = require('express');
  //Aqui configuracion antes del app.listen()
  //await app.listen(3000)

  const cookieParser = require('cookie-parser');

  app.use(cookieParser('poliburger'));
  app.set('view engine','ejs')
  app.use(express.static('publico'));


  await app.listen(3001);
}
bootstrap();
