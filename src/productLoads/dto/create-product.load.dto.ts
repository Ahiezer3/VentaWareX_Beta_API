import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateProductLoadDto extends CreateMyDto{
    key: number;
    keyProduct: number;
    loadTo:string;
    loadType: string;
    currentStock: number;
    quantityLoad: number;
    newStock: number;
    dateLoad: Date;
    commentsLoad: string;
}
