import { CreateMyDto } from "src/dto/create-my.dto";
import { SaleDetail } from "src/sale-details/entities/sale-detail.entity";

export class CreateSalesDto extends CreateMyDto{
    keyCustomer: number;
    listPrice: string;
    date: Date;
    totalProducts: number;
    totalReturn: number;
    quantityPackaging: number;
    quantityRefund: number;
    subtotalOriginal: number;
    subtotal: number;
    iva: number;
    ieps: number;
    total: number;
    totalCost: number;
    refundAmount: number;
    packagingAmount: number;

    subtotalFormat: string | undefined;
    ivaFormat: string | undefined;
    iepsFormat: string | undefined;
    totalFormat: string | undefined;
    totalCostFormat: string;
    refundAmountFormat: string | undefined;
    packagingAmountFormat: string | undefined;

    details: SaleDetail[];
}
