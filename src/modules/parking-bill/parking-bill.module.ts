
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingPlace } from 'src/models';
import { ParkingPlaceService } from './parking-bill.service';
import { ParkingPlaceController } from './parking-bill.controller';
import { UsersModule } from '../user/user.module';


@Module({
    imports: [TypeOrmModule.forFeature([ParkingPlace]), UsersModule],
    providers: [ParkingPlaceService,],
    controllers: [ParkingPlaceController],
    exports: [ParkingPlaceService]
})
export class ParkingPlaceModule { }