import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingPlace } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingBillService {
    constructor(
        @InjectRepository(ParkingPlace)
        private parkingPlaceRepository: Repository<ParkingPlace>,
    ) { }

    async findAll(): Promise<ParkingPlace[]> {
        const parkingBill = await this.parkingPlaceRepository.find();
        if (!parkingBill) {
            throw new NotFoundException()
        }
        return parkingBill
    }

    async findAllAvailable(): Promise<ParkingPlace[]> {
        const parkingBill = await this.parkingPlaceRepository.find({ where: { isAvailable: true } });
        if (!parkingBill) {
            throw new NotFoundException()
        }
        return parkingBill
    }

    async create(): Promise<ParkingPlace | null> {
        const newParkingPlace = await this.parkingPlaceRepository.create()
        await this.parkingPlaceRepository.save(newParkingPlace)
        return newParkingPlace
    }

    async takePlace(): Promise<ParkingPlace> {
        const availablePlace = await this.findAllAvailable()
        if (!availablePlace) {
            throw new NotFoundException()
        }
        const place = availablePlace[0]
        place.isAvailable = false
        await place.save()
        return place
    }


    async remove(id: number): Promise<void> {
        await this.parkingPlaceRepository.delete(id);
    }
}