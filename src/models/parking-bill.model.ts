import { AfterInsert, BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Table } from "typeorm";
import { Guest } from ".";
import { ParkingPlace } from "./parking-place.model";
@Entity('parking-bills')
export class ParkingBill extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Guest, (guest) => guest.licensePlate)
    @JoinColumn()
    licensePlate: string

    @OneToOne(() => Guest, (guest) => guest.checkIn)
    @JoinColumn()
    checkIn: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @JoinColumn()
    checkOut: Date

    @Column({ type: 'varchar', nullable: true })
    duration: string;

    @AfterInsert()
    calculateDuration() {
        if (this.checkIn && this.checkOut) {
            const diff = Math.abs(this.checkOut.getTime() - this.checkIn.getTime());
            const duration = new Date(diff).toISOString().substr(11, 8);
            this.duration = duration;
        }
    }

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number;

    @AfterInsert()
    calculatePrice() {
        if (this.checkIn && this.checkOut) {
            const diff = Math.abs(this.checkOut.getTime() - this.checkIn.getTime());
            const durationInHours = Math.ceil(diff / (1000 * 60 * 60));
            const firstFiveHoursPrice = 1.5;
            const additionalHoursPrice = (durationInHours - 5) * 0.5;
            const totalHoursPrice = Math.max(0, additionalHoursPrice);
            this.price = firstFiveHoursPrice + totalHoursPrice;
        }
    }

    @OneToOne(() => Guest, (guest) => guest.place)
    place: ParkingPlace
}
