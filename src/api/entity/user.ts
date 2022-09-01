import { Entity, ObjectID, ObjectIdColumn, Column, Unique } from 'typeorm';
import RoleEnum from '../models/enum/role.enum';

@Entity('users')
@Unique(['email'])
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: RoleEnum;
}
