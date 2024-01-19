import { IsString } from "class-validator";
import { User } from "src/models";

export class RegisterVehicleDTO {
    @IsString()
    name: string

    @IsString()
    licensePlate: string

    user: User
}