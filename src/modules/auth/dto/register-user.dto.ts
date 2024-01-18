import { IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class RegisterUserDTO {
    @IsString()
    name: string

    @IsPhoneNumber()
    phone: string

    @IsString()
    username: string

    password: string
}