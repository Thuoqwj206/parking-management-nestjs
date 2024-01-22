import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.providers';
import { AuthModule } from './modules/auth/auth.module';
import { GuestModule } from './modules/guest/guest.module';
import { ParkingBillModule } from './modules/parking-bill/parking-bill.module';
import { ParkingPlaceModule } from './modules/parking-place/parking-place.module';
import { UsersModule } from './modules/user/user.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { MailModule } from './mail/mail.module';

console.log('__dirname: ', __dirname)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ParkingBillModule,
    GuestModule,
    AuthModule,
    UsersModule,
    VehicleModule,
    ScheduleModule.forRoot(),
    ParkingPlaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
