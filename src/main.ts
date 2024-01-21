import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import { DocumentSwagger } from './common/swagger/document/document';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  app.enableCors();

  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');
  const host = configService.get('app.host');
  const port = configService.get('app.port.api');

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
    const document = SwaggerModule.createDocument(
      app,
      new DocumentSwagger(configService).Builder(),
    );

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
