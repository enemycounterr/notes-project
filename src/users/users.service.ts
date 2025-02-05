import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NoteService } from 'src/note/note.service';

@Injectable()
export class UsersService {
  private readonly users: CreateUserDto[] = [
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
  // constructor(private readonly noteService: NoteService){}
  constructor(@Inject(NoteService) private readonly noteService: NoteService) { }


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

  public addUser(user: CreateUserDto) {
    // if (!user.content || note.content.length === 0) {
    //   throw new NoteException('Note is empty!');
    // }

    // if (!note.userId || note.userId.length === 0) {
    //   throw new NoteException('User not found');
    // }

    const newUser = { 
      id: this.generateId(),
      name: user.name,
      password: user.password,
      email: user.email
      };
      
    
    this.users.push(newUser)
    // this.isEmpty(user);

  }
  
  private generateId(): string {
    const currentSize = this.users.length;
    if (currentSize === 0){
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

    // const updatedNote = { ...this.notes[noteIndex], ...updateNoteDto };
   
    const updatedUser = {
      id: this.users[userIndex].id,
      name: updateUserDto.name ? updateUserDto.name : this.users[userIndex].name,
      password: updateUserDto.password ? updateUserDto.password : this.users[userIndex].password,
      email: updateUserDto.email ? updateUserDto.email : this.users[userIndex].email
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
