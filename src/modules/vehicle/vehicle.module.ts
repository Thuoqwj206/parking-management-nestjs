
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Vehicle } from 'src/models';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { UsersModule } from '../user/user.module';
import { ParkingPlaceModule } from '../parking-place/parking-place.module';


@Module({
    imports: [TypeOrmModule.forFeature([Vehicle]), UsersModule, ParkingPlaceModule],
    providers: [VehicleService,],
    controllers: [VehicleController],
    exports: []
})
export class VehicleModule { }