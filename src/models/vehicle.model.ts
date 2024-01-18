import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Table } from "typeorm";
import { User } from "./user.model";

@Entity('vehicles')
export class Vehicle extends BaseEntity {
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
    licensePlate: string

    @Column({
        type: 'timestamp',
        default: () => `CURRENT_TIMESTAMP + INTERVAL 30 DAY`,
    })
    expirationDate: Date

    @ManyToOne(() => User, (user) => user.id)
    user: User
}