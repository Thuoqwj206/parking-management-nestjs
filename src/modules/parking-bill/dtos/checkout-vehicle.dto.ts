import { IsNumber, IsString } from "class-validator";
import { ParkingPlace } from "src/models";

export class CheckOutVehicleDTO {
    @IsNumber()
    id: number

    @IsString()
    licensePlate: string


    checkIn: Date

    place: ParkingPlace
}