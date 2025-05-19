import { Module } from '@nestjs/common';
import SubscribersController from './subscribers.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SubscriberService } from './subscriber.service';

@Module({
    imports: [ConfigModule],
    controllers: [SubscribersController],
    providers: [ SubscriberService,
        {
            provide: 'SUBSCRIBERS_MICRO_SERVICE_RMQ',
            useFactory: (configService: ConfigService) => {
                const user = configService.get('RABBITMQ_USER');
                const password = configService.get('RABBITMQ_PASSWORD');
                const host = configService.get('RABBITMQ_HOST');
                const queueName = configService.get('RABBITMQ_QUEUE_NAME');
                console.log("Cloud AMQP ", user, password, host, queueName);
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqps://${user}:${password}@${host}`],
                        queue: queueName,
                        queueOptions: {
                            durable: true,
                        },
                    },
                })
            },
            inject: [ConfigService],
        }
        // {
        //     provide: 'SUBSCRIBERS_MICRO_SERVICE',
        //     useFactory: (configService: ConfigService) =>{
        //         console.log("CHECK ENV VAR", configService.get('SUBSCRIBERS_SERVICE_HOST'));
        //         return ClientProxyFactory.create({
        //             transport: Transport.TCP,
        //             options: {
        //                 host: configService.get('SUBSCRIBERS_SERVICE_HOST'),
        //                 port: configService.get('SUBSCRIBERS_SERVICE_PORT'),

        //             },
        //         })

        //     },
        //     inject: [ConfigService],
        // },
    ],
    exports:[SubscriberService]
})
export class SubscribersModule { }
