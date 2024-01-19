import { IsString } from "class-validator";

export class UpdateVehicleDTO {
    @IsString()
    name: string
}