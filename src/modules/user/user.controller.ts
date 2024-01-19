import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { Role } from "src/models";
import { currentUser } from "../decorators/current-user.decorator";
import { Roles } from "../decorators/role.decorator";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { UserService } from "./user.service";
import { RoleGuard } from "src/common/guard/role.guard";
@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UsersController {
    constructor(private readonly userService: UserService) { }
    @Get()
    @Roles(Role.ADMIN)
    async getAll() {
        return this.userService.findAll()
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async update(@Body() body: UpdateUserDTO, @Param('id', ParseIntPipe) id: number, @currentUser() user) {
        const updateUser = await this.userService.update(body, id, user);
        return updateUser;
    }
}