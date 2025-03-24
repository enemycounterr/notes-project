import NoteEntity from 'src/note/entities/note.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class NoteItemEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public type: string;

  // @Column()
  // public noteId: string;

  @Column()
  public data: string;

  @ManyToMany(() => NoteEntity, (note: NoteEntity) => note.noteItems)
  public notes: NoteEntity[];
}

export default NoteItemEntity;