import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { StorageModule } from 'src/storage/storage.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [StorageModule, ConfigModule],
  controllers: [MediaController]
})
export class MediaModule {}
