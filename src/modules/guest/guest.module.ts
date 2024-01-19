
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from 'src/models';
import { GuestController } from './guest.controller';
import { UsersModule } from '../user/user.module';
import { GuestService } from './guest.service';
import { ParkingPlaceModule } from '../parking-place/parking-place.module';


@Module({
    imports: [TypeOrmModule.forFeature([Guest]), UsersModule, ParkingPlaceModule],
    providers: [GuestService,],
    controllers: [GuestController],
    exports: [GuestService]
})
export class GuestModule { }