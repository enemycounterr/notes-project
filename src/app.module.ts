import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NoteModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
