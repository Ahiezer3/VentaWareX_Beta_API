import { MyEntity } from "src/entity/my.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class SaleDetail extends MyEntity{

    @Column()
    keySale: number;

    @Column()
    keyProduct: number;

    @Column({nullable: true})
    sku: string = '';

    @Column()
    nameProduct: string;

    @Column()
    listSelected: string;

    @Column({type:'decimal', precision: 15, scale: 6})
    basePriceTaxes: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    price: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    priceReturn: number;

    @Column()
    quantity: number;

    @Column()
    quantityReturn: number;

    @Column()
    quantityPackaging: number;

    @Column()
    quantityRefund: number;

    @Column()
    return: boolean;

    @Column({type:'decimal', precision: 15, scale: 6})
    iva: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    ieps: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    subtotalOriginal: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    subtotal: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    total: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    totalCost: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    refundAmount: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    packagingAmount: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    iepsPercentage:number;

    @Column({type:'decimal', precision: 15, scale: 6})
    ivaPercentage:number;

    @Column({type:'decimal', precision: 15, scale: 6})
    unityTotal:number;


    priceFormat: string;

    quantityFormat: string;

    subtotalFormat: string;

    ivaFormat: string;

    iepsFormat: string;

    totalFormat: string;

    totalCostFormat: string;
    refundAmountFormat: string;
    packagingAmountFormat: string | undefined;
    
    @ManyToOne(() => Sale, sale => sale.details)
    @JoinColumn({name:'keySale'})
    sale: Sale;
}
