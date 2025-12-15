import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  // Permitir solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization'
    // credentials: true,  // Permitir cookies y encabezados de autenticación
  });
  
  process.env.TZ = 'UTC';
  
  await app.listen(port, '0.0.0.0');
}
bootstrap();
