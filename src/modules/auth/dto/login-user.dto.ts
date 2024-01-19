import { IsString } from "class-validator";

export class LoginUserDTO {
    @IsString()
    username: string

    password: string
}