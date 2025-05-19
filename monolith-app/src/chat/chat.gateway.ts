import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SubscriberService } from 'src/subscribers/subscriber.service';
import { forkJoin, map } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly chatService: ChatService,
    // @Inject('SUBSCRIBERS_MICRO_SERVICE_RMQ')
    // private subscribersServiceRmq: ClientProxy
    @Inject(SubscriberService)
    private readonly subscriberService: SubscriberService
  ) { }

  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto) {
    console.log("GET ALL SUBSCRIBERS");
    const allSubscriberObservable = await this.subscriberService.getSubscribers();
    const allSubscribers = await lastValueFrom(allSubscriberObservable);
    let isSubscriberExist = false;
    for (const subscriber of allSubscribers) {

      if (createChatDto.membersEmails.includes(subscriber.email)) {
        isSubscriberExist = true;

      }
      // console.log(subscriber);
    }
    if (isSubscriberExist) {
      if (createChatDto.creator === "admin") {

        this.server.emit("messageToChat", "hello everyone!");
      }
    }else{
      console.log("user doesn t exist in database");
    }


    // const result = forkJoin(Array.from([allSubsOperation])).pipe(
    //   map(responses =>
    //     responses
    //       .filter(subscriber => subscriber && subscriber.id)   
    //       .map(subscriber => subscriber)     // Remove nulls and invalid entries             
    //   )
    // );

    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('subscriberMessage')
  sendMessageToAll(@MessageBody() message: string){
    this.server.emit("messageToChat", message);  
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
