import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateWarehouseDto extends CreateMyDto{
    keyBusiness: number;
    name: string;
    details: string;
}
