import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest, ParkingPlace } from 'src/models';
import { Repository } from 'typeorm';
import { CheckInGuestDTO } from './dtos/checkin-guest.dto';
import { ParkingPlaceService } from '../parking-place/parking-place.service';

@Injectable()
export class GuestService {
    constructor(
        @InjectRepository(Guest)
        private guestRepository: Repository<Guest>,
        private parkingPlaceService: ParkingPlaceService
    ) { }

    async findAll(): Promise<Guest[]> {
        const guests = await this.guestRepository.find();
        if (!guests) {
            throw new NotFoundException()
        }
        return guests
    }

    async findPlace(id: number): Promise<ParkingPlace> {
        const guest = await this.guestRepository.findOne({ where: { id } });
        if (!guest) {
            throw new NotFoundException()
        }
        return guest.place
    }


    async findById(id: number): Promise<Guest> {
        const guest = await this.guestRepository.findOne({ relations: ['place'], where: { id } });
        if (!guest) {
            throw new NotFoundException()
        }
        return guest
    }

    async findByLicensePlate(licensePlate: string): Promise<Guest> {
        const guest = await this.guestRepository.findOne({ relations: ['place'], where: { licensePlate } },
        );
        if (!guest) {
            throw new NotFoundException()
        }
        return guest
    }

    async checkIn(body: CheckInGuestDTO): Promise<Guest> {
        const guest = await this.guestRepository.findOne({ where: { licensePlate: body.licensePlate } })
        if (guest) {
            throw new NotAcceptableException()
        }
        const place = await this.parkingPlaceService.takePlace() as unknown as ParkingPlace
        body.place = place
        const newGuest = await this.guestRepository.create(body)
        await this.guestRepository.save(newGuest)
        return newGuest
    }

    async remove(id: number): Promise<void> {
        await this.guestRepository.delete(id);
    }
}