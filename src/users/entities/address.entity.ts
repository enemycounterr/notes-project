import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";

@Entity()
class AddressEntity {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public street: string;
 
  @Column()
  public city: string;
 
  @Column()
  public country: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.address)
  public user: UserEntity;
}
export default AddressEntity;

