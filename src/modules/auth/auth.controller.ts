import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDTO } from "./dto";
import { LoginUserDTO } from "./dto/login-user.dto";
import { AuthGuard } from "src/common/guard/auth.guard";
import { currentUser } from "../decorators/current-user.decorator";
import { User } from "src/models";

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

    @Get('current-user')
    @UseGuards(AuthGuard)
    getCurrentUser(@currentUser() currentUser: User) {
        return currentUser
    }
}