import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Item } from "./Item";
import { Scene } from "./Scene";
import { EntityName } from "./EntityName";

@Entity()
export class EntityCharacter {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => EntityName,
    (entityName) => entityName.givenNameCharacters,
  )
  name!: EntityName;

  @ManyToOne(() => EntityName, (entityName) => entityName.surnameCharacters)
  surname!: EntityName;

  @Column()
  rational!: boolean;

  @Column()
  created_at!: number;

  @Column()
  modified_at!: number;

  @ManyToMany(() => Item, (item) => item.entitycharacters)
  @JoinTable()
  items!: Item[];

  @ManyToMany(() => Scene, (scene) => scene.entitycharacters)
  @JoinTable()
  scenes!: Scene[];
}
