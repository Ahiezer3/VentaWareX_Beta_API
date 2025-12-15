import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateProductDto extends CreateMyDto{

    name: string;
    description: string;
    provider: string;
    provider_sku: string;
    category: string;
    measure: string;
    quantity: number;
    image: string;
    keyWarehouse: number;
    return: boolean;
}
