import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { VehicleService } from "./vehicle.service";
import { RegisterVehicleDTO, UpdateVehicleDTO } from "./dtos";
import { currentUser } from "../decorators/current-user.decorator";
import { extendValidity } from "./dtos/extend-validity.dto";
import { Role } from "src/models";
import { Roles } from "../decorators/role.decorator";


@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }
    @Get()
    @UseGuards(AuthGuard)
    async getAll() {
        return this.vehicleService.findAll()
    }

    @Put('extend')
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)
    async extend(@Body() body: extendValidity) {
        const newVehicle = await this.vehicleService.extendValidity(body)
        return newVehicle
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async update(@Body() body: UpdateVehicleDTO, @Param('id', ParseIntPipe) id: number, @currentUser() user) {
        const updateVehicle = await this.vehicleService.update(body, id, user);
        return updateVehicle;
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: RegisterVehicleDTO, @currentUser() user) {
        const newVehicle = await this.vehicleService.create(body, user)
        return newVehicle
    }

}