import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
   
    public readonly id?: number;
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public password: string;
    @IsNotEmpty()
    public email: string;

    // constructor(){
    //     this.id = '';
    //     this.name = '';
    //     this.password = '';
    //     this.email = '';
    // }
}
