import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NoteService } from 'src/note/note.service';
import { NoteModule } from 'src/note/note.module';
import { NoteItemsModule } from 'src/note-items/note-items.module';


@Module({
  imports: [NoteModule, NoteItemsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
})
export class UsersModule {}
