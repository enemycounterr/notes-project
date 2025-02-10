import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { UsersModule } from './users/users.module';
import { NoteItemsModule } from './note-items/note-items.module';

@Module({
  imports: [NoteModule, UsersModule, NoteItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
