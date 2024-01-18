import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDTO } from "./dto";
import { LoginUserDTO } from "./dto/login-user.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() requestBody: RegisterUserDTO) {
        return this.authService.register(requestBody)
    }


    @Post('login')
    async login(@Body() requestBody: LoginUserDTO) {
        return this.authService.login(requestBody)
    }
}