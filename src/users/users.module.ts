import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NoteService } from 'src/note/note.service';
import { NoteModule } from 'src/note/note.module';


@Module({
  imports: [NoteModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    
    
  ],
})
export class UsersModule {}
