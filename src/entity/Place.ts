import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Scene } from "./Scene";

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  size!: string;

  @OneToMany(() => Scene, (scene) => scene.place) 
  scenes!: Scene[];
}
