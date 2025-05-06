import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscriber {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ unique: true })
    public email: string;
   
    @Column()
    public name: string;
}

export default Subscriber;
