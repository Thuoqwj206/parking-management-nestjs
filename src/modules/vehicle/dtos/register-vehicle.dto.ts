import { IsString } from "class-validator";
import { ParkingPlace, User } from "src/models";

export class RegisterVehicleDTO {
    @IsString()
    name: string

    @IsString()
    licensePlate: string

    user: User

    parkingPlace: ParkingPlace
}