import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { loggerFun } from './common/middleware/loggerFun.middleware';

@Module({
  imports: [
    CatsModule,
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: 'mongodb://localhost:27017/nest-test',
    //   }),
    // }),
    MongooseModule.forRoot(
      'mongodb://admin:123456@localhost:27017/?authSource=admin',
    ),
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, loggerFun)
      // .apply(loggerFun)
      .exclude(
        // { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        // 'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
