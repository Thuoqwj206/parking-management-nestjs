import { BadRequestException, Body, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from "./dto/login-user.dto";
import { User } from "src/models";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) { }

    async register(@Body() requestBody: RegisterUserDTO) {
        const user = await this.userService.findByUsername(requestBody.username)
        if (user) {
            throw new BadRequestException('Username already existed')
        }

        const hashedPassword = await bcrypt.hash(requestBody.password, 5)
        requestBody.password = hashedPassword
        const newUser = await this.userService.create(requestBody)
        return {
            msg: 'User has been created',
            newUser: newUser.username
        }
    }

    async login(@Body() requestBody: LoginUserDTO) {
        const user = await this.userService.findByUsername(requestBody.username)
        if (!user) {
            throw new BadRequestException('Not found Username')
        }
        const validPassword = await bcrypt.compare(requestBody.password, user.password)
        if (!validPassword) {
            throw new BadRequestException('Wrong password')
        }
        const accessToken = await this.generateToken(user)
        return {
            user, accessToken
        }
    }

    async generateToken(user: User) {
        const payload = { id: user.id, role: user.role }
        return await this.jwtService.signAsync(payload)
    }
}
