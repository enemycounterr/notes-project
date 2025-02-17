import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/note/create-note.dto';
import { NoteException } from './exception/note.exception/note.exception';
import { UpdateNoteDto } from './dto/note/update-note.dto';

@Injectable()
export class NoteService {
    private notes : CreateNoteDto[] = [
        {
            id : 0,
            content:"first note",
            userId : "0"
        },
        {
            id : 1,
            content:"second note",
            userId : "1"
        },
        {
            id : 2,
            content:"third note",
            userId : "0"
        },
        {
            id : 3,
            content:"first message",
            userId : "1"
        }
    ];

    public getNotes(): CreateNoteDto[]{
        return this.notes;
    }

    public getNote(id: number): CreateNoteDto{
        const note = this.notes.find(note => note.id === id);
        console.log(note);
        
        return note!; //Todo: investigate createnoteDto | undefined 

    }
    

    public addNote(note: CreateNoteDto): CreateNoteDto {
        if (!note.content || note.content.length === 0){
            throw new NoteException('Note is empty!');
        }
        
        if (!note.userId || note.userId.length === 0){
            throw new NoteException('User not found');
        }
           
        const newNote = { id: this.generateId(), content: note.content, userId :note.userId};
        this.notes.push(newNote)

        return newNote;
    }

    public updateNote(id: number, updateNoteDto: UpdateNoteDto){
        
        const noteIndex = this.notes.findIndex(note => note.id === id);
        
        if (noteIndex === -1) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        console.log(updateNoteDto);
        const updatedNote = { 
            id: this.notes[noteIndex].id,
            content: updateNoteDto.content? updateNoteDto.content : this.notes[noteIndex].content,
            userId: updateNoteDto.userId? updateNoteDto.userId : this.notes[noteIndex].userId,
        };
        this.notes[noteIndex] = updatedNote;
        return updatedNote;

    }

    public removeNote(id : number): void {
        const resultingArray: CreateNoteDto[] = this.notes.filter(note => note.id !== id);

        if (resultingArray.length === this.notes.length){
            throw new NoteException('No note found');
        }
        
        this.notes = resultingArray;
    }

    private generateId(): number {
        const currentSize = this.notes.length;
        if (currentSize === 0){
            return 0;
        }
        
        return this.notes[currentSize - 1].id + 1;
    }
}
