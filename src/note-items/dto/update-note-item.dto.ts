import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteItemDto } from './create-note-item.dto';

export class UpdateNoteItemDto extends PartialType(CreateNoteItemDto) {}
