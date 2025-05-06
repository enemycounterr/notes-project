import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteItemDto } from './dto/create-note-item.dto';
import { UpdateNoteItemDto } from './dto/update-note-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import NoteItem from './entities/note-item.entity';
import NoteItemEntity from './entities/note-item.entity';
import { Repository } from 'typeorm';
import NoteEntity from 'src/note/entities/note.entity';
import { Note } from 'src/note/dto/note/note';
import { CreateNoteDto } from 'src/note/dto/note/create-note.dto';

@Injectable()
export class NoteItemsService {

  constructor(
    @InjectRepository(NoteItemEntity) private noteItemRepository: Repository<NoteItemEntity>,
    @InjectRepository(NoteEntity) private noteRepository: Repository<NoteEntity>
  ) { }

  // public createNoteItem(noteItem: CreateNoteItemDto) {

  //   const newNoteItem = {
  //     id: this.generateId(),
  //     type: noteItem.type,
  //     noteId: noteItem.noteId,
  //     data: noteItem.data
  //   };
  //   this.noteItems.push(newNoteItem)
  // }


  // public findAll(noteId: string) {
  //   const foundNoteItems = this.noteItems.filter(item => item.noteId === noteId);
  //   if (!foundNoteItems) {
  //     console.log(`No Note items found with this Note Id: ${noteId}`);
  //   }
  //   return foundNoteItems;
  // }


  public async getAllNoteItems() {
    return this.noteItemRepository.find();
  }

  public async createNoteItem(item: CreateNoteItemDto, userId: string) {
    const newItem = await this.noteItemRepository.create(item);
    await this.noteItemRepository.save(newItem);
    let noteToAddItem = await this.noteRepository.findOne({
      where: {
        id: Number(item.noteId)
      }
    }) as NoteEntity;
    if (!noteToAddItem) {
      const data = new CreateNoteDto();
      data.content = "default created";
      data.title = "default created";
      data.userId = userId;
      noteToAddItem = await this.noteRepository.create(data);
      await this.noteRepository.save(noteToAddItem);
    }
    noteToAddItem!.noteItems = [newItem];
    await this.noteRepository.save(noteToAddItem);
    return noteToAddItem;
  }

  public async getNoteItem(noteItemId: string) {
    const noteItem = await this.noteItemRepository.findOne({
      where: {
        id: Number(noteItemId)
      }
    });
    if (noteItem) {
      return noteItem;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  public async updateNoteItem(nId: number, newItem: UpdateNoteItemDto) {
    await this.noteItemRepository.update(nId, newItem);
    const updatedItem = await this.noteItemRepository.findOne({
      where: {
        id: nId
      }
    });

    if (updatedItem) {
      return updatedItem
    }
    throw new HttpException('Note Item not found', HttpStatus.NOT_FOUND);
  }


  public async deleteNoteItem(nId: number) {
    const deleteResponse = await this.noteItemRepository.delete(nId);
    if (!deleteResponse.affected) {
      throw new HttpException('Note Item not found', HttpStatus.NOT_FOUND);
    }
  }

  public async getNoteItemsAndCount() {
    const [noteItems, total] = await this.noteItemRepository.findAndCount();
    return {
      items: noteItems,
      totalCount: total
    }
  }

}
