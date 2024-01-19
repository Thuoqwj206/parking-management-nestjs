import { Injectable, NotFoundException } from '@nestjs/common';
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

    async checkIn(body: CheckInGuestDTO): Promise<Guest> {
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