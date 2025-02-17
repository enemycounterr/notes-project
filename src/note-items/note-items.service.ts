import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteItemDto } from './dto/create-note-item.dto';
import { UpdateNoteItemDto } from './dto/update-note-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import NoteItem from './entities/note-item.entity';
import NoteItemEntity from './entities/note-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteItemsService {

  // private noteItems: CreateNoteItemDto[] = [
  // {
  //   id: '0',
  //   type: "text",
  //   noteId: "0",
  //   data: "hello danil"
  // },
  // {
  //   id: '1',
  //   type: "url",
  //   noteId: "0",
  //   data: "https:/secondItem"
  // },
  //   {
  //     id: '2',
  //     type: "image",
  //     noteId: "1",
  //     data: "src/img"
  //   },
  //   {
  //     id: '3',
  //     type: "text",
  //     noteId: "1",
  //     data: "hello ann"
  //   },
  //   {
  //     id: '4',
  //     type: "url",
  //     noteId: "2",
  //     data: "https:/thirdItem"
  //   },
  //   {
  //     id: '5',
  //     type: "image",
  //     noteId: "2`",
  //     data: "src/img2"
  //   }
  // ]

  constructor(
    @InjectRepository(NoteItem)
    private noteItemRepository: Repository<NoteItemEntity>
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

  public async createNoteItem(item: CreateNoteItemDto) {
    const newItem = await this.noteItemRepository.create(item);
    await this.noteItemRepository.save(newItem);
    return newItem;
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

  // public updateNoteItem(id: string, updateNoteItemDto: UpdateNoteItemDto) {
  //   const noteItemIndex = this.noteItems.findIndex(item => item.id === id);

  //   if (noteItemIndex === -1) {
  //     console.log(`Note with ID ${id} not found`);
  //   }
  //   const updatedItem = {
  //     id: this.noteItems[noteItemIndex].id,
  //     type: updateNoteItemDto.type ? updateNoteItemDto.type : this.noteItems[noteItemIndex].type,
  //     noteId: updateNoteItemDto.noteId ? updateNoteItemDto.noteId : this.noteItems[noteItemIndex].noteId,
  //     data: updateNoteItemDto.data ? updateNoteItemDto.data : this.noteItems[noteItemIndex].data
  //   };

  //   this.noteItems[noteItemIndex] = updatedItem;
  //   return updatedItem;
  // }

  // public removeNoteItem(id: string) {
  //   const resultingArray: CreateNoteItemDto[] = this.noteItems.filter(item => item.id !== id);

  //   if (resultingArray.length === this.noteItems.length) {
  //     console.log('No user found');
  //   }

  //   this.noteItems = resultingArray;
  // }
}
