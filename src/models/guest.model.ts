import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Table } from "typeorm";
import { User } from "./user.model";
import { ParkingPlace } from "./parking-place.model";

@Entity('guests')
export class Guest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    checkIn: Date

    @Column({
        type: 'varchar',
    })
    licensePlate: string

    @OneToOne(() => ParkingPlace)
    @JoinColumn()
    place: ParkingPlace
}