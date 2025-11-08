import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AddressEntity from "./address.entity";
import NoteEntity from "src/note/entities/note.entity";

@Entity()
class UserEntity {
    @PrimaryGeneratedColumn()
    public id?: number;
   
    @Column({ unique: true })
    public email: string;
   
    @Column()
    public name: string;
   
    @Column()
    public password: string;

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    public address: AddressEntity;

    @OneToMany(() => NoteEntity, (note: NoteEntity) => note.user)
    public notes: NoteEntity[];

}
export default UserEntity;
