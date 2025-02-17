import { Module } from '@nestjs/common';
import { NoteItemsService } from './note-items.service';
import { NoteItemsController } from './note-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import NoteItem from './entities/note-item.entity';
import NoteItemEntity from './entities/note-item.entity';

@Module({
  imports:[
   TypeOrmModule.forFeature([NoteItemEntity])
  ],
  controllers: [NoteItemsController],
  providers: [NoteItemsService],
  exports: [NoteItemsService]
})
export class NoteItemsModule {}
