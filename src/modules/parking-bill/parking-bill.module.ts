
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingBill } from 'src/models';
import { ParkingBillService } from './parking-bill.service';
import { ParkingBillController } from './parking-bill.controller';
import { UsersModule } from '../user/user.module';
import { GuestModule } from '../guest/guest.module';
import { ParkingPlaceModule } from '../parking-place/parking-place.module';



@Module({
    imports: [TypeOrmModule.forFeature([ParkingBill]), UsersModule, GuestModule, ParkingPlaceModule],
    providers: [ParkingBillService,],
    controllers: [ParkingBillController],
    exports: [ParkingBillService]
})
export class ParkingBillModule { }