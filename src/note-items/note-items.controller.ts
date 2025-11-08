import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NoteItemsService } from './note-items.service';
import { CreateNoteItemDto } from './dto/create-note-item.dto';
import { UpdateNoteItemDto } from './dto/update-note-item.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('note-items')
export class NoteItemsController {
  constructor(private readonly noteItemsService: NoteItemsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createNoteItemDto: CreateNoteItemDto) {
    return this.noteItemsService.createNoteItem(createNoteItemDto);
  }

  @Get("count")
  getNoteItemsAndCount(){
    return this.noteItemsService.getNoteItemsAndCount();
  }
  
  @Get()
  findAllNoteItems(){
    return this.noteItemsService.getAllNoteItems();
  }
  
  @Get(':id')
  findNoteItemById(@Param('id') noteId: string) {
    return this.noteItemsService.getNoteItem(noteId);
  }

  // @Get('get-one/:id')
  // findOne(@Param('id') id: string) {
  //   return this.noteItemsService.getNoteItem(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteItemDto: UpdateNoteItemDto) {
    return this.noteItemsService.updateNoteItem(Number(id), updateNoteItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteItemsService.deleteNoteItem(Number(id));
  }
}
