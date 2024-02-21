import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as basicAuth from 'express-basic-auth';
import {
  BadRequestException,
  InternalServerErrorException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentSwagger } from './common/swagger/document/document';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      //   transformOptions: {
      //     enableImplicitConversion: true,
      //   },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.log(validationErrors);
        try {
          return new BadRequestException(
            validationErrors.map((error) => ({
              field: error.property,
              error: Object.values(error.constraints).join(', '),
            })),
          );
        } catch (error) {
          return new InternalServerErrorException(error);
        }
      },
    }),
  );
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');

  const swaggerConfig: any = configService.get<any>('swagger.config');
  const swaggerPath = swaggerConfig.documentationPath;

  let swaggerUrl: string;
  if (swaggerConfig.swaggerUI === true) {
    app.use(
      [`${swaggerPath}`, `${swaggerConfig.documentationJson}`],
      basicAuth({
        challenge: true,
        users: {
          [`${swaggerConfig.swaggerUser}`]: swaggerConfig.swaggerPassword,
        },
      }),
    );
    const document = SwaggerModule.createDocument(
      app,
      new DocumentSwagger(configService).Builder(),
    );

    const swaggerOptions = configService.get<any>('plugin.swagger.options');
    SwaggerModule.setup(`${swaggerPath}`, app, document, {
      swaggerOptions: swaggerOptions,
    });
  }
  await app.listen(
    configService.get('app.port.api'),
    configService.get('app.host'),
  );
  const appUrl = await app.getUrl();
  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`RUNNING ON \t: ${appUrl}`);
  console.log(`SWAGGER UI\t: ${appUrl}${swaggerPath}`);
}
bootstrap();
