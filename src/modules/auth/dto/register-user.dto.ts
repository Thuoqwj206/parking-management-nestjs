import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class RegisterUserDTO {
    @IsString()
    name: string

    @IsPhoneNumber()
    phone: string

    @IsEmail()
    email: string

    @IsString()
    username: string

    password: string
}