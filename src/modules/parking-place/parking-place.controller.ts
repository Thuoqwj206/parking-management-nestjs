import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ParkingPlaceService } from "./parking-place.service";
import { AuthGuard } from "src/common/guard/auth.guard";
import { Role } from "src/models";
import { Roles } from "../decorators/role.decorator";


@Controller('parking-place')
export class ParkingPlaceController {
    constructor(private readonly parkingPlaceService: ParkingPlaceService) { }
    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)

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
    @Roles(Role.ADMIN)
    async create() {
        const newParkingPlace = await this.parkingPlaceService.create()
        return newParkingPlace
    }

}