import { AfterInsert, BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Table } from "typeorm";
import { User } from "./user.model";
import { format, addDays } from 'date-fns';
import { ParkingPlace } from "./parking-place.model";

export enum Status {
    ACTIVE = 'ACTIVE',
    UNREGISTER = 'UNREGISTER'
}
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
        length: 15,
        unique: true
    })
    licensePlate: string

    @Column({
        type: 'timestamp',
        default: () => `CURRENT_TIMESTAMP`,
    })
    expirationDate: Date

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status

    @OneToOne(() => ParkingPlace, (parkingPlace) => parkingPlace.id)
    @JoinColumn()
    parkingPlace: ParkingPlace

    @AfterInsert()
    addDaysToTimestamp() {
        const date = new Date(this.expirationDate);
        const newDate = addDays(date, 30);
        this.expirationDate = newDate
        this.save()
    }

}