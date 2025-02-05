import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
   
    public readonly id: string;
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
