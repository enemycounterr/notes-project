import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/note/create-note.dto';
import { NoteExceptionFilter } from './filter/note-exception/note-exception.filter';
import { UpdateNoteDto } from './dto/note/update-note.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { CloneNoteDto } from './dto/note/clone-note.dto';

@Controller('notes')
@UseFilters(new NoteExceptionFilter())
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get()
    findAll() {
      return this.noteService.getAllNotes();
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    create(@Body() createNoteDto: CreateNoteDto, @Req() request: RequestWithUser) {
      return this.noteService.addNote(String(request.user.id!), createNoteDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.noteService.getNoteById(Number(id));
    }

    @Post('/clone')
    @UseGuards(JwtAuthenticationGuard)
    cloneNote(@Body() cloneNote: CloneNoteDto, @Req() request: RequestWithUser){
      return this.noteService.cloneNote(String(request.user.id!), cloneNote.id);
    }
  

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
        return this.noteService.updateNote(Number(id), updateNoteDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.noteService.deleteNote(Number(id));
    }


}







// @Get()
    // public findAll(): CreateNoteDto[] {
    //     return this.noteService.getNotes();
    // }

    // @Get(':id')
    // public findone(@Param('id') id: string): CreateNoteDto {
    //     return this.noteService.getNote(Number(id));
    // }

    // @Post()
    // public create(@Body() note: CreateNoteDto): CreateNoteDto {
    //     return this.noteService.addNote(note);
    // }

    // @Patch(':id')
    // public update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
        
    //     return this.noteService.updateNote(+id, updateNoteDto);
    //   }

    // @Delete(':id')
    // public delete(@Param('id') id: number): void {

    //     this.noteService.removeNote(Number(id)); 
    // }
