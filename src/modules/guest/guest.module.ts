
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from 'src/models';
import { GuestController } from './guest.controller';
import { UsersModule } from '../user/user.module';
import { GuestService } from './guest.service';
import { ParkingPlaceModule } from '../parking-place/parking-place.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guard/role.guard';


@Module({
    imports: [TypeOrmModule.forFeature([Guest]), UsersModule, ParkingPlaceModule],
    providers: [GuestService, {
        provide: APP_GUARD,
        useClass: RolesGuard,
    }],
    controllers: [GuestController],
    exports: [GuestService]
})
export class GuestModule { }