import NoteItemEntity from "src/note-items/entities/note-item.entity";
import UserEntity from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class NoteEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column()
  public date: string;

  @Column()
  public userId: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.notes)
  public user: UserEntity;

  @ManyToMany(() => NoteItemEntity, (noteItem: NoteItemEntity) => noteItem.notes)
  @JoinTable()
  public noteItems: NoteItemEntity[];
  
}

export default NoteEntity;