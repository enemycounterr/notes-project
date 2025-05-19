import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateSubscriberDto } from "./dto/createSubscriber.dto";
import { forkJoin, map } from "rxjs";

@Injectable()
export class SubscriberService {
    constructor(
        @Inject('SUBSCRIBERS_MICRO_SERVICE_RMQ')
        private readonly subscribersServiceRmq: ClientProxy
    ) { }

    async getSubscribers() {
        return this.subscribersServiceRmq.send(
            {
                cmd: 'get-all-subscribers',
            },
            '',
        );
    }

    async addSubscriber(subscriber: CreateSubscriberDto) {
        return this.subscribersServiceRmq.send(
            {
                cmd: 'add-subscriber',
            },
            subscriber,
        );
    }

    async sendBatch(subscriber: CreateSubscriberDto) {
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