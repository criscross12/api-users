import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { HttpErrorsInterceptor } from './apps/shared/errors/interceptors/http-errors.interceptor';
import { HttpExceptionDto } from './apps/shared/exceptions/http-dto.exception';
import { HttpExceptionFilter } from './apps/shared/filters/http-exception.filter';
import { appConfigLoader } from './config/configs/database.loader';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const appConfig = appConfigLoader();
  const logger: Logger = app.get(Logger);
  const config = new DocumentBuilder()
    .setTitle('Doc api users')
    .setDescription('Documentación de api users')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpErrorsInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
        value: true,
      },
      exceptionFactory(errors) {
        if (errors.length > 0) {
          throw new HttpExceptionDto(errors, true);
        }
        return true;
      },
    }),
  );

  await app.listen(appConfig.port, null, () => {
    logger.log(`Listening: http://localhost:${appConfig.port}`, 'AppConfig');
    logger.log(`Environment: ${appConfig.env}`, 'AppConfig');
    logger.log(
      `Database: {type: ${appConfig.db.type}, host: ${appConfig.db.host}, username: ${appConfig.db.username}, password: ****, database: ${appConfig.db.database} }`,
      'DB_Config',
    );
  });
}
bootstrap();
