import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/note/create-note.dto';
import { NoteException } from './exception/note.exception/note.exception';
import { UpdateNoteDto } from './dto/note/update-note.dto';
import NoteEntity from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { date } from '@hapi/joi';
import UserEntity from 'src/users/entities/user.entity';

@Injectable()
export class NoteService {
    constructor(
      @InjectRepository(NoteEntity) private noteRepository: Repository<NoteEntity>,
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){}

    async addNote(userId: string, note: CreateNoteDto) {
        const newNoteWithDate = {
          ...note,
          date: (new Date()).toISOString(),
          userId
        };
          
        const newNote = await this.noteRepository.create(newNoteWithDate);
        await this.noteRepository.save(newNote);
        return newNote;
    }

    async getAllNotes() {
        return await this.noteRepository.find();
    }

    async getNoteById(idParam: number) {
        const note = await this.noteRepository.findOne({
          where: {
            id: idParam
          }
        });
        if (note) {
          return note;
        }
        throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    // async cloneNote(userId: string, id: string){
    //   const userWithNotes = await this.noteRepository.find({
    //     where: {
    //       userId:userId
    //     },
    //     relations: ['user']
    //   });
    //   console.log("TEST");
    //   console.log(userWithNotes);
    //   return userWithNotes;
    // }
    async cloneNote(userId: string, nId: string){
      const userWithNotes = await this.userRepository.findOne({
        where: {
          id:Number(userId)
        },
        relations: ['notes']
      });
      const clonedNote = userWithNotes?.notes.find((note)=> note.id === Number(nId));
      const {id, ...noteWithoutId} = clonedNote!;
      const created = await this.noteRepository.create(noteWithoutId);
     
      const noteItemsToClone = await this.noteRepository.findOne({
        where:{
          id:Number(nId)
        },
        relations: ['noteItems']

      })
      created.noteItems = noteItemsToClone?.noteItems!;
      console.log(noteItemsToClone);
      await this.noteRepository.save(created);
      return created;
    }

     async updateNote(nId: number, noteData: UpdateNoteDto) {
        await this.noteRepository.update(nId, noteData);
        const updatedNote = await this.noteRepository.findOne({
          where: {
            id: nId
          }
        });
        if (updatedNote) {
          return updatedNote;
        }
        throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    async deleteNote(nId: number) {
        const deleteNote = await this.noteRepository.delete(nId);
        if (!deleteNote.affected) {
          throw new HttpException('Note with this id not found', HttpStatus.NOT_FOUND);
        }
        return deleteNote;
      }


    


    

      

}






    // public getNotes(): CreateNoteDto[]{
    //     return this.notes;
    // }

    // public getNote(id: number): CreateNoteDto{
    //     const note = this.notes.find(note => note.id === id);
    //     console.log(note);
        
    //     return note!; //Todo: investigate createnoteDto | undefined 

    // }
    

    // public addNote(note: CreateNoteDto): CreateNoteDto {
    //     if (!note.content || note.content.length === 0){
    //         throw new NoteException('Note is empty!');
    //     }
        
    //     if (!note.userId || note.userId.length === 0){
    //         throw new NoteException('User not found');
    //     }
           
    //     const newNote = { id: this.generateId(), content: note.content, userId :note.userId};
    //     this.notes.push(newNote)

    //     return newNote;
    // }

    // public updateNote(id: number, updateNoteDto: UpdateNoteDto){
        
    //     const noteIndex = this.notes.findIndex(note => note.id === id);
        
    //     if (noteIndex === -1) {
    //         throw new NotFoundException(`Note with ID ${id} not found`);
    //     }
    //     console.log(updateNoteDto);
    //     const updatedNote = { 
    //         id: this.notes[noteIndex].id,
    //         content: updateNoteDto.content? updateNoteDto.content : this.notes[noteIndex].content,
    //         userId: updateNoteDto.userId? updateNoteDto.userId : this.notes[noteIndex].userId,
    //     };
    //     this.notes[noteIndex] = updatedNote;
    //     return updatedNote;

    // }

    // public removeNote(id : number): void {
    //     const resultingArray: CreateNoteDto[] = this.notes.filter(note => note.id !== id);

    //     if (resultingArray.length === this.notes.length){
    //         throw new NoteException('No note found');
    //     }
        
    //     this.notes = resultingArray;
    // }

    // private generateId(): number {
    //     const currentSize = this.notes.length;
    //     if (currentSize === 0){
    //         return 0;
    //     }
        
    //     return this.notes[currentSize - 1].id + 1;
    // }