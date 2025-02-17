import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NoteService } from 'src/note/note.service';
import { NoteItemsService } from 'src/note-items/note-items.service';
import { privateDecrypt } from 'crypto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [
    {
      id: "0",
      name: "ann",
      password: "123",
      email: "first@gmail.com"
    },
    {
      id: "1",
      name: "alex",
      password: "f7",
      email: "second@gmail.com"
    }
  ];

  constructor(
    @Inject(NoteService) private readonly noteService: NoteService,
    @Inject(NoteItemsService) private readonly noteItemService: NoteItemsService
  ) { }

  // public getNoteItemsByUserIdAndNoteId(userId: string, noteId: string){
  //     const foundNotes = this.noteService.getNotes().filter(note => note.userId === userId);

  //     if (!foundNotes || foundNotes.length === 0) {
  //       return `No one notes were found with this ${userId}`;
  //     }
  //     console.log(`noteId - ${noteId}`);
  //     const foundNotesItem = foundNotes.map(note => {
  //         const result = this.noteItemService.getNoteItems().filter(noteItem => {      
  //         return noteItem.noteId === noteId;  
  //         })
  //         return result;
  //       });

  //     if (!foundNotesItem || foundNotesItem.length === 0) {
  //       return `No one notes items were found with this ${noteId}`;
  //     }
  //     return foundNotesItem;
  // }

  getNoteItemsByUserIdAndNoteId(userId: string, noteId: string) {
    // const userNotes = this.noteService.getNotes().filter(note => note.userId === userId);
  
    // if (!userNotes || userNotes.length === 0) {
    //   return `No notes found for user ${userId}`;
    // }

    // const specificNote = userNotes.find(note => String(note.id) === noteId);
    // if (!specificNote) {
    //   return `Note ${noteId} not found for user ${userId}`;
    // }
    
    // // const noteItems = this.noteItemService.getNoteItems().filter(noteItem => noteItem.noteId === noteId);
    // const noteItems = this.noteItemService.filterByNoteId(noteId);

    // if (noteItems.length === 0) {
    //   return `No note items found for note ${noteId}`;
    // }

    // return noteItems;
  }


  public addUser(user: CreateUserDto) {
    const newUser = {
      id: this.generateId(),
      name: user.name,
      password: user.password,
      email: user.email
    };

    this.users.push(newUser)

  }

  private generateId(): string {
    const currentSize = this.users.length;
    if (currentSize === 0) {
      return '0';
    }
    const idNumber = Number(this.users[currentSize - 1].id) + 1;
    return idNumber.toString();
  }

  public getUser(id: string): CreateUserDto {
    const user = this.users.find(user => user.id === id);
    console.log(user);
    return user!;
  }

  public getUsers() {
    return this.users;
  }

  public updateUser(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      console.log(`Note with ID ${id} not found`);
    }
    const updatedUser = {
      id: this.users[userIndex].id,
      name: updateUserDto.name ? updateUserDto.name : this.users[userIndex].name,
      password: updateUserDto.password ? updateUserDto.password : this.users[userIndex].password,
      email: updateUserDto.email ? updateUserDto.email : this.users[userIndex].email
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  public removeUser(id: string): void {
    const resultingArray: CreateUserDto[] = this.users.filter(user => user.id !== id);
    if (resultingArray.length === this.users.length) {
      console.log('No user found');
    }
    this.users = resultingArray;
  }
}



// private isEmpty(user: CreateUserDto){
//   const originalKeys = Object.keys(new CreateUserDto());
//   const keys: string[] = Object.keys(user);
//   originalKeys.forEach(key =>{
//     if (!user[key] || user[key].length === 0){
//       console.log(`${key} is empty!`)
//     }
//   })

// keys.forEach(key => {
//   console.log(key);
//   console.log(user[key]);
//   if (!user[key] || user[key].length === 0) {
//     //throw new NoteException('Note is empty!'); Todo: create USer exception
//     console.log(`${user[key]} is empty!`)
//   }
// })
//}