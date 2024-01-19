import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Floor } from "./floor.model";

@Entity('parking-places')
export class ParkingPlace extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'boolean',
        default: true
    })
    isAvailable: boolean

    // @ManyToOne(() => Floor, (floor) => floor.id)
    // floor: Floor
}