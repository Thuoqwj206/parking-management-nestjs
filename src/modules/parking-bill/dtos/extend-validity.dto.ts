import { IsNumber } from "class-validator";

export class extendValidity {
    @IsNumber()
    id: number

    @IsNumber()
    months: number
}