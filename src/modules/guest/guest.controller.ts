import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { GuestService } from "./guest.service";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CheckInGuestDTO } from "./dtos/checkin-guest.dto";


@Controller('guest')
export class GuestController {
    constructor(private readonly guestService: GuestService) { }
    @Get()
    @UseGuards(AuthGuard)
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