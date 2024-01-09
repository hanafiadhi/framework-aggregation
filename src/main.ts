import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get(ConfigService);
  app.enableCors();

  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');
  const host = configService.get('app.host');
  const port = configService.get('app.port.api');
  const localUri = configService.get<any>('swagger.localUri');
  const develompentUri = configService.get<any>('swagger.develompentUri');
  const productionUri = configService.get<any>('swagger.productionUri');

  const passSwagger = process.env.SWAGGER_PASSWORD || 'bismillah';
  app.use(
    ['/framework/docs', '/framework/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        hanafi: passSwagger,
      },
    }),
  );
  const swaggerConfig: any = configService.get<any>('swagger.config');

  if (swaggerConfig.swaggerUI === true) {
    const swaggerConfigBuilder = new DocumentBuilder()
      .setTitle(swaggerConfig.info.title)
      .setVersion(swaggerConfig.info.version)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWTAuth',
      )
      .addServer(`${localUri}`, 'Local Server')
      .addServer(`${develompentUri}`, 'Development Server')
      .addServer(`${productionUri}`, 'Production Server')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfigBuilder);
    const swaggerOptions = configService.get<any>('plugin.swagger.options');
    SwaggerModule.setup(swaggerConfig.documentationPath, app, document, {
      swaggerOptions: swaggerOptions,
    });
  }
  await app.listen(port, host);
  const appUrl = await app.getUrl();

  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`RUNNING ON \t: ${appUrl}`);

  if (swaggerConfig.swaggerUI === true) {
    console.log(`SWAGGER UI\t: ${appUrl}${swaggerConfig.documentationPath}`);
  }
}
bootstrap();
