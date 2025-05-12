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
import { forkJoin, map } from 'rxjs';

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

    @Post('batch')
    async sendBatch(@Body() subscriber: CreateSubscriberDto) {
        const pendingOperations = Array.from(new Array(100)).map((_, index) => {
            const subscriberName = `${subscriber.name}${index}`;

            return this.subscribersServiceRmq.send({ cmd: 'add-subscriber' }, {
                // name: subscriber.name + index,
                name: subscriberName,
                email: `${subscriberName}${subscriber.email}`
            });
        }

        );

        console.time("ForkJoin filter map");
        // const result = forkJoin(pendingOperations).pipe(
        //     map((data) => data.reduce((ids:string[], createdSubscriber)=> {
        //         if(createdSubscriber && createdSubscriber.id){
        //             ids.push(createdSubscriber.id);
        //         }
        //         return ids;
        //     },[]))
        // );
        const result = forkJoin(pendingOperations).pipe(
            map(responses =>
                responses
                    .filter(createdSubscriber => createdSubscriber && createdSubscriber.id)        // Remove nulls and invalid entries
                    .map(createdSubscriber => createdSubscriber.id)                  // Extract only ids
                                          
            )
        );
        console.timeEnd("ForkJoin filter map");
        return result;
        // console.log("PENDING OPERATIONS", pendingOperations);
        // await Promise.all(pendingOperations);
        // const results = await Promise.allSettled(pendingOperations);
        // const failed = results.filter(r => r.status === 'rejected');
        // if (failed.length) {
        //     console.warn(`${failed.length} operations failed`);
        // }
        // return 'Batch processing completed with some errors.';
    }
}
