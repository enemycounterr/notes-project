import { Module } from '@nestjs/common';
import { NoteItemsService } from './note-items.service';
import { NoteItemsController } from './note-items.controller';

@Module({
  controllers: [NoteItemsController],
  providers: [NoteItemsService],
  exports: [NoteItemsService]
})
export class NoteItemsModule {}
