import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(
    private readonly subscribersService: SubscribersService,
  ) { }

  @MessagePattern({ cmd: 'add-subscriber' })
  addSubscriber(subscriber: CreateSubscriberDto) {
    console.log("RECEIVED ", subscriber);
    return this.subscribersService.addSubscriber(subscriber);
  }

  @MessagePattern({ cmd: 'get-all-subscribers' })
  getAllSubscribers() {
    return this.subscribersService.getAllSubscribers();
  }



  @MessagePattern('findOneSubscriber')
  findOne(@Payload() id: number) {
    return this.subscribersService.findOne(id);
  }

  @MessagePattern('updateSubscriber')
  update(@Payload() updateSubscriberDto: UpdateSubscriberDto) {
    return this.subscribersService.update(updateSubscriberDto.id, updateSubscriberDto);
  }

  @MessagePattern('removeSubscriber')
  remove(@Payload() id: number) {
    return this.subscribersService.remove(id);
  }
}
