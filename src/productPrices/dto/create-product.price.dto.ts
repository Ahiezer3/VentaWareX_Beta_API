import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateProductPriceDto extends CreateMyDto{
    key: number;
    keyProduct: number;
    basePrice: number;
    basePriceTaxes: number;
    listOne: number;
    listOneTaxes: number;
    listTwo: number;
    listTwoTaxes: number;
    listThree: number;
    listThreeTaxes: number;
    ieps: number;
    iva: number;
    priceReturn: number;
}
