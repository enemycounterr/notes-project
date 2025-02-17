import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class NoteItemEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public type: string;

  @Column()
  public noteId: string;

  @Column()
  public data: string;
}

export default NoteItemEntity;