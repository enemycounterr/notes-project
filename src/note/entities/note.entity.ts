import UserEntity from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  
}

export default NoteEntity;