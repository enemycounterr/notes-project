import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NoteService } from 'src/note/note.service';
import { NoteItemsService } from 'src/note-items/note-items.service';
import { privateDecrypt } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import RegisterDTO from 'src/authentication/dto/register.dto';
import AddressEntity from './entities/address.entity';

@Injectable()
export class UsersService {
  // private users: CreateUserDto[] = [
  //   {
  //     id: "0",
  //     name: "ann",
  //     password: "123",
  //     email: "first@gmail.com"
  //   },
  //   {
  //     id: "1",
  //     name: "alex",
  //     password: "f7",
  //     email: "second@gmail.com"
  //   }
  // ];

  constructor(
    @Inject(NoteService) private readonly noteService: NoteService,
    @Inject(NoteItemsService) private readonly noteItemService: NoteItemsService,
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>
  ) { }

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

  //@ONE TO ONE
  async getAllAddressesWithUsers() {
    return await this.addressRepository.find({ relations: ['user'] });
  }
  //@ONE TO ONE
  async getAllUsersWithAddress() {
    return await this.usersRepository.find({ relations: ['address'] });
  }

  //@ONE TO MANY
  async getUserWithNotes(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['notes'] 
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user; 

  }


  async addUser(user: RegisterDTO) {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async getUserById(idParam: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: idParam
      }
    });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getByEmail(emailParam: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: emailParam
      }
    });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async updateUser(Uid: number, userData: UpdateUserDto) {
    await this.usersRepository.update(Uid, userData);
    const updatedUser = await this.usersRepository.findOne({
      where: {
        id: Uid
      }
    });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(Uid: number) {
    const deleteUser = await this.usersRepository.delete(Uid);
    if (!deleteUser.affected) {
      throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND);
    }
    return deleteUser;
  }


}



//OLD VERSION
// public addUser(user: CreateUserDto) {
//   const newUser = {
//     id: this.generateId(),
//     name: user.name,
//     password: user.password,
//     email: user.email
//   };

//   this.users.push(newUser)

// }

// private generateId(): string {
//   const currentSize = this.users.length;
//   if (currentSize === 0) {
//     return '0';
//   }
//   const idNumber = Number(this.users[currentSize - 1].id) + 1;
//   return idNumber.toString();
// }

// public getUser(id: string): CreateUserDto {
//   const user = this.users.find(user => user.id === id);
//   console.log(user);
//   return user!;
// }

// public getUsers() {
//   return this.users;
// }

// public updateUser(id: string, updateUserDto: UpdateUserDto) {
//   const userIndex = this.users.findIndex(user => user.id === id);
//   if (userIndex === -1) {
//     console.log(`Note with ID ${id} not found`);
//   }
//   const updatedUser = {
//     id: this.users[userIndex].id,
//     name: updateUserDto.name ? updateUserDto.name : this.users[userIndex].name,
//     password: updateUserDto.password ? updateUserDto.password : this.users[userIndex].password,
//     email: updateUserDto.email ? updateUserDto.email : this.users[userIndex].email
//   };
//   this.users[userIndex] = updatedUser;
//   return updatedUser;
// }

// public removeUser(id: string): void {
//   const resultingArray: CreateUserDto[] = this.users.filter(user => user.id !== id);
//   if (resultingArray.length === this.users.length) {
//     console.log('No user found');
//   }
//   this.users = resultingArray;
// }