import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Subscriber } from 'rxjs';
import { SubscribersModule } from './subscribers/subscribers.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [SubscribersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SUBSCRIBERS_SERVICE_HOST: Joi.string().required(),
        SUBSCRIBERS_SERVICE_PORT: Joi.number().required()


      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
