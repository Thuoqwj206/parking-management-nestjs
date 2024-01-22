import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Table } from "typeorm";
import { ParkingPlace } from "./parking-place.model";
import { ParkingBill } from "./parking-bill.model";

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

    @OneToOne(type => ParkingPlace, parkingPlace => parkingPlace.id, { cascade: ["insert", "remove", "soft-remove", "recover"] })
    @JoinColumn()
    place: ParkingPlace
}