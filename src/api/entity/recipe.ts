import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('recipes')
export class Recipe {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  ingredients: string;

  @Column()
  preparation: string;

  @Column()
  userId: ObjectID;

  @Column()
  image: string;
}
