import { IsString } from "class-validator";
import { ParkingPlace, User } from "src/models";

export class CheckInGuestDTO {
    @IsString()
    licensePlate: string

    place: ParkingPlace
}