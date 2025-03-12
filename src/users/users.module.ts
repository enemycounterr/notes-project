import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NoteService } from 'src/note/note.service';
import { NoteModule } from 'src/note/note.module';
import { NoteItemsModule } from 'src/note-items/note-items.module';
import UserEntity from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import AddressEntity from './entities/address.entity';
import NoteEntity from 'src/note/entities/note.entity';


@Module({
  imports: [NoteModule, NoteItemsModule, TypeOrmModule.forFeature([UserEntity, AddressEntity, NoteEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
  exports:[UsersService]
})
export class UsersModule {}
