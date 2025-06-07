import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EntityCharacter } from "./EntityCharacter";

@Entity()
export class RationalEntityName {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => EntityCharacter, (entitycharacter) => entitycharacter.name) 
  entitycharacters!: EntityCharacter[];
}

@Entity()
export class EntityIdentifier {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  value!: string;

  @Column({ type: 'varchar' })
  type!: 'rational_name' | 'irrational_name' | 'surname';
}
