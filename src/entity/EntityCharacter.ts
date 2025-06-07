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
import { RationalEntityName } from "./RationalEntityName";

@Entity()
export class EntityCharacter {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => RationalEntityName, (rationalentityname) => rationalentityname.entitycharacters)
  @Column()
  name!: number;

  @Column()
  surname!: number;

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
