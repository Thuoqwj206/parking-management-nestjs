import { IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    name: string
    @IsPhoneNumber()
    phone: string

    password: string
}