import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { Role } from "src/models";
import { Roles } from "../decorators/role.decorator";
import { CheckInGuestDTO } from "./dtos/checkin-guest.dto";
import { GuestService } from "./guest.service";
@Controller('guest')
export class GuestController {
    constructor(private readonly guestService: GuestService) { }
    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)
    async getAll() {
        return this.guestService.findAll()
    }

    @Post('checkIn')
    @UseGuards(AuthGuard)
    async checkIn(@Body() body: CheckInGuestDTO) {
        const newGuest = await this.guestService.checkIn(body)
        return newGuest
    }

}