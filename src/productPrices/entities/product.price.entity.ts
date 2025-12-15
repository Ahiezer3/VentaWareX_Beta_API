import { MyEntity } from "src/entity/my.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ProductPrice extends MyEntity{

    @Column()
    keyProduct: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    basePrice: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    basePriceTaxes: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    listOne: number;
    
    @Column({type:'decimal', precision: 15, scale: 6})
    listOneTaxes: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    listTwo: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    listTwoTaxes: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    listThree: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    listThreeTaxes: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    ieps: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    iva: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    priceReturn: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({name:'keyProduct'})
    product: Product;
}
