import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerFun } from './common/middleware/loggerFun.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global middleware only use function
  app.use(loggerFun);
  await app.listen(3000);
}
bootstrap();
