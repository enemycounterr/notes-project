import { IsNotEmpty } from "class-validator";

export class CreateNoteItemDto {
    public readonly id : string;
    @IsNotEmpty()
    public type : string;
    @IsNotEmpty()
    public noteId : string;
    @IsNotEmpty()
    public data: string;
}
