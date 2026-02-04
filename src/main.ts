import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Swagger UI
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Cheque APIS')
    .setDescription('API for create and manage cheques')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Cheque API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/favicon.ico',
  });

  // Bind to 0.0.0.0 to make it accessible from outside the container
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: http://0.0.0.0:3000`);
  console.log(`Swagger documentation: http://0.0.0.0:3000/api`);
}
bootstrap();
