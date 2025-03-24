import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    public id?: number;
    
    @Column()
    public name: string;

    
}
