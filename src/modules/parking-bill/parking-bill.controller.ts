import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ParkingBillService } from "./parking-bill.service";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CheckOutVehicleDTO } from "./dtos";
import { Role } from "src/models";
import { Roles } from "../decorators/role.decorator";


@Controller('parking-bill')
export class ParkingBillController {
    constructor(private readonly parkingBillService: ParkingBillService) { }
    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)

    async getAll() {
        return this.parkingBillService.findAll()
    }
    @Post()
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)

    async checkout(@Body() body: CheckOutVehicleDTO) {
        const newParkingBill = await this.parkingBillService.checkout(body)
        return newParkingBill
    }

}