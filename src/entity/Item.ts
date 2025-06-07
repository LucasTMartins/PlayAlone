import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { EntityCharacter } from "./EntityCharacter";

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  size!: string

  @ManyToMany(() => EntityCharacter, (entitycharacter) => entitycharacter.items)
  entitycharacters!: EntityCharacter[]
}
