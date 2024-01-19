import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ParkingPlaceService } from "./parking-bill.service";
import { AuthGuard } from "src/common/guard/auth.guard";


@Controller('parking-place')
export class ParkingPlaceController {
    constructor(private readonly parkingPlaceService: ParkingPlaceService) { }
    @Get()
    @UseGuards(AuthGuard)
    async getAll() {
        return this.parkingPlaceService.findAll()
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAllAvailable() {
        return this.parkingPlaceService.findAllAvailable()
    }
    @Post()
    @UseGuards(AuthGuard)
    async create() {
        const newParkingPlace = await this.parkingPlaceService.create()
        return newParkingPlace
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async takePlace(@Param('id', ParseIntPipe) id: number) {
        const updateParkingPlace = await this.parkingPlaceService.takePlace();
        return updateParkingPlace;
    }

}