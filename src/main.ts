import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerFun } from './common/middleware/loggerFun.middleware';
import { ValidationPipe } from './common/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global middleware only use function
  app.use(loggerFun);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
