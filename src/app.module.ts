import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { UsersModule } from './users/users.module';
import { NoteItemsModule } from './note-items/note-items.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './media/media.module';



@Module({
  imports: [NoteModule, UsersModule, NoteItemsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        GOOGLE_DRIVE_FOLDER:Joi.string(),
        GOOGLE_STORAGE_PROJECT_ID:Joi.string().required(),
        GOOGLE_STORAGE_PRIVATE_KEY_ID:Joi.string().required(),
        GOOGLE_STORAGE_PRIVATE_KEY:Joi.string().required(),
        GOOGLE_STORAGE_CLIENT_EMAIL:Joi.string().required(),
        GOOGLE_STORAGE_BUCKET:Joi.string().required()
      })
    }),
    DatabaseModule,
    AuthenticationModule,
    StorageModule,
    MediaModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
