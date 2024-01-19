import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { User } from "./user.model";

@Entity('floors')
export class Floor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string

    @Column({
        type: 'integer',
    })
    capacity: number
}