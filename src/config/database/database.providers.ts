import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest, ParkingPlace, User, Vehicle } from 'src/models';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'parking-database',
            entities: [User, Vehicle, ParkingPlace, Guest],
            migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
            migrationsTableName: 'migrations',
            subscribers: [`${__dirname}/subscriber/*{.ts,.js}`],
            synchronize: true,
            logging: ['error'],
        }),
    ],
})
export class DatabaseModule { }