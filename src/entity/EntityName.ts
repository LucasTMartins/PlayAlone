import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EntityCharacter } from "./EntityCharacter";

export type EntityNameType = 'Rational' | 'Irrational' | 'Surname';

@Entity()
export class EntityName {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  value!: string;

  @Column({ type: 'varchar' })
  type!: EntityNameType;

  @OneToMany(() => EntityCharacter, (character) => character.name)
  givenNameCharacters!: EntityCharacter[];

  @OneToMany(() => EntityCharacter, (character) => character.surname)
  surnameCharacters!: EntityCharacter[];
}
