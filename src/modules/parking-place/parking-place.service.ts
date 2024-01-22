import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingPlace } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingPlaceService {
    constructor(
        @InjectRepository(ParkingPlace)
        private parkingPlaceRepository: Repository<ParkingPlace>,
    ) { }

    async findAll(): Promise<ParkingPlace[]> {
        const parkingPlaces = await this.parkingPlaceRepository.find();
        if (!parkingPlaces) {
            throw new NotFoundException()
        }
        return parkingPlaces
    }

    async findById(id: number): Promise<ParkingPlace> {
        const parkingPlace = await this.parkingPlaceRepository.findOne({ where: { id } });
        if (!parkingPlace) {
            throw new NotFoundException()
        }
        return parkingPlace
    }

    async findAllAvailable(): Promise<ParkingPlace[]> {
        const parkingPlaces = await this.parkingPlaceRepository.find({ where: { isAvailable: true } });
        if (!parkingPlaces) {
            throw new NotFoundException()
        }
        return parkingPlaces
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

    async returnPlace(id: number) {
        await this.parkingPlaceRepository.save({
            id: id,
            isAvailable: true
        })
    }

    async remove(id: number): Promise<void> {
        await this.parkingPlaceRepository.delete(id);
    }
}