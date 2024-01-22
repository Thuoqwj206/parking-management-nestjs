
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingPlace } from 'src/models';
import { ParkingPlaceService } from './parking-place.service';
import { ParkingPlaceController } from './parking-place.controller';
import { UsersModule } from '../user/user.module';


@Module({
    imports: [TypeOrmModule.forFeature([ParkingPlace]), UsersModule],
    providers: [ParkingPlaceService,],
    controllers: [ParkingPlaceController],
    exports: [ParkingPlaceService]
})
export class ParkingPlaceModule { }