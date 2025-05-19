import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { SubscribersModule } from 'src/subscribers/subscribers.module';

@Module({
  imports:[SubscribersModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
