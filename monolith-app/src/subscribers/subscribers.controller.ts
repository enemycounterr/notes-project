import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Inject,
} from '@nestjs/common';
//   import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { CreateSubscriberDto } from './dto/createSubscriber.dto';
import { ClientProxy } from '@nestjs/microservices';
import { forkJoin, map, Subscriber } from 'rxjs';
import { SubscriberService } from './subscriber.service';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export default class SubscribersController {
    constructor(
        // @Inject('SUBSCRIBERS_MICRO_SERVICE_RMQ')
        // private subscribersServiceRmq: ClientProxy,
        private readonly subscriberService: SubscriberService
    ) { }

    // @Get()
    // @UseGuards(JwtAuthenticationGuard) IF AUTH IS IMPLEMENTED
    @Get()
    async getSubscribers() {
       
        return this.subscriberService.getSubscribers();
    }

    // @Post()
    // @UseGuards(JwtAuthenticationGuard)
    @Post()
    async createSubscriber(@Body() subscriber: CreateSubscriberDto) {
        return this.subscriberService.addSubscriber(subscriber);
    }

    @Post('batch')
    async sendBatch(@Body() subscriber: CreateSubscriberDto) {
        return this.subscriberService.sendBatch(subscriber);
    }
}
