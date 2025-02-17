import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/note/create-note.dto';
import { NoteExceptionFilter } from './filter/note-exception/note-exception.filter';
import { UpdateNoteDto } from './dto/note/update-note.dto';

@Controller('note')
@UseFilters(new NoteExceptionFilter())
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get()
    public findAll(): CreateNoteDto[] {
        return this.noteService.getNotes();
    }

    @Get(':id')
    public findone(@Param('id') id: string): CreateNoteDto {
        return this.noteService.getNote(Number(id));
    }

    @Post()
    public create(@Body() note: CreateNoteDto): CreateNoteDto {
        return this.noteService.addNote(note);
    }

    @Patch(':id')
    public update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
        
        return this.noteService.updateNote(+id, updateNoteDto);
      }

    @Delete(':id')
    public delete(@Param('id') id: number): void {

        this.noteService.removeNote(Number(id)); 
    }
}
