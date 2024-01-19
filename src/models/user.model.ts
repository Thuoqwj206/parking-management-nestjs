import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string

    @Column({
        type: 'varchar',
        length: 15
    })
    phone: string

    @Column({
        type: 'varchar',
        length: 30
    })
    username: string

    @Column({
        type: 'varchar'
    })
    password: string


    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role
}