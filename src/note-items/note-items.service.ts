import { Injectable } from '@nestjs/common';
import { CreateNoteItemDto } from './dto/create-note-item.dto';
import { UpdateNoteItemDto } from './dto/update-note-item.dto';

@Injectable()
export class NoteItemsService {

  private noteItems: CreateNoteItemDto[] = [
    {
      id: '0',
      type: "text",
      noteId: "0",
      data: "hello danil"
    },
    {
      id: '1',
      type: "url",
      noteId: "0",
      data: "https:/secondItem"
    },
    {
      id: '2',
      type: "image",
      noteId: "0",
      data: "src/img"
    },
    {
      id: '3',
      type: "text",
      noteId: "1",
      data: "hello ann"
    },
    {
      id: '4',
      type: "url",
      noteId: "1",
      data: "https:/thirdItem"
    },
    {
      id: '5',
      type: "image",
      noteId: "1",
      data: "src/img2"
    }
  ]

  public getNoteItems(){
    return this.noteItems;
  }
  public createNoteItem(noteItem: CreateNoteItemDto) {

    const newNoteItem = {
      id: this.generateId(),
      type: noteItem.type,
      noteId: noteItem.noteId,
      data: noteItem.data
    };
    this.noteItems.push(newNoteItem)
  }

  private generateId(): string {
    const currentSize = this.noteItems.length;
    if (currentSize === 0) {
      return '0';
    }
    const idNumber = Number(this.noteItems[currentSize - 1].id) + 1;

    return idNumber.toString();
  }

  public findAll(noteId: string) {
    const foundNoteItems = this.noteItems.filter(item => item.noteId === noteId);
    if (!foundNoteItems) {
      console.log(`No Note items found with this Note Id: ${noteId}`);
    }
    return foundNoteItems;
  }

  public getNoteItem(id: string): CreateNoteItemDto {
    const noteItem = this.noteItems.find(item => item.id === id);

    return noteItem!;
  }

  public updateNoteItem(id: string, updateNoteItemDto: UpdateNoteItemDto) {
    const noteItemIndex = this.noteItems.findIndex(item => item.id === id);

    if (noteItemIndex === -1) {
      console.log(`Note with ID ${id} not found`);
    }
    const updatedItem = {
      id: this.noteItems[noteItemIndex].id,
      type: updateNoteItemDto.type ? updateNoteItemDto.type : this.noteItems[noteItemIndex].type,
      noteId: updateNoteItemDto.noteId ? updateNoteItemDto.noteId : this.noteItems[noteItemIndex].noteId,
      data: updateNoteItemDto.data ? updateNoteItemDto.data : this.noteItems[noteItemIndex].data
    };

    this.noteItems[noteItemIndex] = updatedItem;
    return updatedItem;
  }

  public removeNoteItem(id: string) {
    const resultingArray: CreateNoteItemDto[] = this.noteItems.filter(item => item.id !== id);

    if (resultingArray.length === this.noteItems.length) {
      console.log('No user found');
    }

    this.noteItems = resultingArray;
  }
}
