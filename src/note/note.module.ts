import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import NoteEntity from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NoteEntity, UserEntity])],
  providers: [NoteService],
  controllers: [NoteController],
  exports: [NoteService]
})
export class NoteModule {}
