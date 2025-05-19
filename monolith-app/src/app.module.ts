import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Subscriber } from 'rxjs';
import { SubscribersModule } from './subscribers/subscribers.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat/chat.gateway';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';


@Module({
  imports: [SubscribersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SUBSCRIBERS_SERVICE_HOST: Joi.string().required(),
        SUBSCRIBERS_SERVICE_PORT: Joi.number().required(),
        
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      })
    }),
    DatabaseModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatService],
})
export class AppModule {}
