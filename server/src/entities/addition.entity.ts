import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Steps } from "../steps/steps.controller";

@Entity()
export class Addition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("json")
  steps!: Steps;
}
