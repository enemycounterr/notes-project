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

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export default class SubscribersController {
    constructor(
        @Inject('SUBSCRIBERS_MICRO_SERVICE_RMQ')
        private subscribersServiceRmq: ClientProxy,
    ) { }

    // @Get()
    // @UseGuards(JwtAuthenticationGuard) IF AUTH IS IMPLEMENTED
    @Get()
    async getSubscribers() {
        console.log('TEST');
        return this.subscribersServiceRmq.send(
            {
                cmd: 'get-all-subscribers',
            },
            '',
        );
    }

    // @Post()
    // @UseGuards(JwtAuthenticationGuard)
    @Post()
    async createPost(@Body() subscriber: CreateSubscriberDto) {
        return this.subscribersServiceRmq.send(
            {
                cmd: 'add-subscriber',
            },
            subscriber,
        );
    }
}
