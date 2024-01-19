import { Body, Injectable, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ParkingPlace, User, Vehicle } from 'src/models';
import { RegisterVehicleDTO, UpdateVehicleDTO } from './dtos';
import { currentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { extendValidity } from './dtos/extend-validity.dto';
import { addDays } from 'date-fns';
import { ParkingPlaceService } from '../parking-place/parking-place.service';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private vehiclesRepository: Repository<Vehicle>,
        private parkingPlaceService: ParkingPlaceService,
    ) { }

    async findAll(): Promise<Vehicle[]> {
        const vehicles = await this.vehiclesRepository.find();
        if (vehicles) {
            return vehicles
        }
    }
    async create(Body: RegisterVehicleDTO, user: User): Promise<Vehicle | null> {
        Body.user = user
        const place = await this.parkingPlaceService.takePlace() as unknown as ParkingPlace
        Body.parkingPlace = place
        const newVehicle = await this.vehiclesRepository.create(Body)
        await this.vehiclesRepository.save(newVehicle)
        return newVehicle
    }

    async findByVehiclename(name: string): Promise<Vehicle> {
        const vehicle = await this.vehiclesRepository.findOne({ where: { name } })
        if (vehicle) {
            return vehicle
        }
        else {
        }
    }

    async findOne(id: number): Promise<{ vehicle?: Vehicle, isSuccess: boolean }> {
        const vehicle = await this.vehiclesRepository.findOne({ where: { id: id } })
        if (!vehicle) {
            return { isSuccess: false }
        }
        return { vehicle, isSuccess: true }
    }

    async update(@Body() Body: UpdateVehicleDTO, id: number, currentUser: User): Promise<{ updatedVehicle?: Vehicle, isSuccess?: boolean }> {
        const vehicle = await this.vehiclesRepository.findOne({ where: { id: id } })
        if (!vehicle) {
            return { isSuccess: false }
        }
        const updatedVehicle = await this.vehiclesRepository.save({
            id: id, ...Body
        })
        return { updatedVehicle, isSuccess: true }
    }
    async remove(id: number): Promise<void> {
        await this.vehiclesRepository.delete(id);
    }

    async extendValidity(body: extendValidity) {
        const { months, id } = body
        const vehicle = await Vehicle.findOne({ where: { id: id } })
        if (!vehicle) {
            throw new NotFoundException()
        }
        const date = new Date(vehicle.expirationDate)
        vehicle.expirationDate = addDays(date, months * 30)
        vehicle.save()
        return vehicle
    }
}