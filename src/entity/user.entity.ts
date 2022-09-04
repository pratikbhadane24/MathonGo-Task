import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "" })
  tfa_secret!: string;
}
