import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleGuard } from './common/guard/role.guard';
import { DatabaseModule } from './config/database/database.providers';
import { AuthModule } from './modules/auth/auth.module';
import { ParkingPlaceModule } from './modules/parking-place/parking-place.module';
import { UsersModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { GuestModule } from './modules/guest/guest.module';

@Module({
  imports: [DatabaseModule,
    GuestModule,
    AuthModule,
    UsersModule,
    VehicleModule,
    ScheduleModule.forRoot(),
    ParkingPlaceModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RoleGuard,
  },],
})
export class AppModule { }
