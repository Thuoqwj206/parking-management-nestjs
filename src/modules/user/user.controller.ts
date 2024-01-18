import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { UserService } from "./user.service";


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async getAll() {
        return this.userService.findAll()
    }

    @Put('/:id')
    async update(@Body() body: UpdateUserDTO, @Param('id') id: string) {
        const userId = parseInt(id, 10);
        const updateUser = await this.userService.update(body, userId);
        return updateUser;
    }
}