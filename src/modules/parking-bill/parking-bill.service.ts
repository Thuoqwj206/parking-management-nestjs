import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingBill } from 'src/models';
import { Repository } from 'typeorm';
import { GuestService } from '../guest/guest.service';
import { CheckOutVehicleDTO } from './dtos';
import { ParkingPlaceService } from '../parking-place/parking-place.service';

@Injectable()
export class ParkingBillService {
    constructor(
        @InjectRepository(ParkingBill)
        private parkingBillRepository: Repository<ParkingBill>,
        private guestService: GuestService,
        private parkingPlaceService: ParkingPlaceService
    ) { }

    async findAll(): Promise<ParkingBill[]> {
        const parkingBills = await this.parkingBillRepository.find();
        if (!this.parkingBillRepository) {
            throw new NotFoundException()
        }
        return parkingBills
    }

    async checkout(body: CheckOutVehicleDTO): Promise<ParkingBill> {
        const guest = await this.guestService.findById(body?.id)
        if (!guest || guest.place?.isAvailable == true) {
            throw new NotAcceptableException()
        }
        body.place = guest.place
        body.checkIn = guest.checkIn
        body.licensePlate = guest.licensePlate
        const newParkingBill = await this.parkingBillRepository.create(body)
        await this.parkingBillRepository.save(newParkingBill)
        await this.parkingPlaceService.returnPlace(guest.place?.id)
        return newParkingBill
    }
    async remove(id: number): Promise<void> {
        await this.parkingBillRepository.delete(id);
    }
}