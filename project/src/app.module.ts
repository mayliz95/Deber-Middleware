import {Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MiddlewaresConsumer} from "@nestjs/common/interfaces/middlewares";
import {LoggerMiddleware} from "./logger.middleware";
import request = require("superagent");
import {CacheMiddleware} from "./cache.middleware";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewaresConsumer) {
      consumer
          .apply(LoggerMiddleware)
          .with('archivo')
          .forRoutes('/archivo');

      consumer
          .apply(LoggerMiddleware)
          .with('consola')
          .forRoutes('/consola');
      consumer
          .apply(LoggerMiddleware)
          .with('todo')
          .forRoutes('/todo');
      consumer
          .apply(CacheMiddleware)
          .forRoutes('/prueba');

    }
}
