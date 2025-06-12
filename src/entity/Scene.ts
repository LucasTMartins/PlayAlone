import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { EntityCharacter } from "./EntityCharacter";
import { Place } from "./Place";

@Entity()
export class Scene {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Place, (place) => place.scenes)
  place!: Place;

  @ManyToMany(
    () => EntityCharacter,
    (entitycharacter) => entitycharacter.scenes
  )
  entitycharacters!: EntityCharacter[];
}
