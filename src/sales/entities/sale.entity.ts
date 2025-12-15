import { Customer } from "src/customers/entities/customer.entity";
import { MyEntity } from "src/entity/my.entity";
import { SaleDetail } from "src/sale-details/entities/sale-detail.entity";
import { Column, Decimal128, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Sale extends MyEntity{
    
    @Column()
    keyCustomer: number;

    @Column()
    listPrice: string;

    @Column()
    date: Date;

    @Column()
    totalProducts: number;

    @Column()
    totalReturn: number;

    @Column()
    quantityPackaging: number;

    @Column()
    quantityRefund: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    subtotalOriginal: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    subtotal: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    iva: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    ieps: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    total: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    totalCost: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    refundAmount: number;

    @Column({type:'decimal', precision: 15, scale: 6})
    packagingAmount: number;

    subtotalFormat: string;

    ivaFormat: string;

    iepsFormat: string;

    totalFormat: string;

    totalCostFormat: string;

    refundAmountFormat: string;

    packagingAmountFormat: string;

    @ManyToOne(() => Customer, { eager: true })
    @JoinColumn({name:'keyCustomer'})
    customer: Customer;

    @OneToMany(() => SaleDetail, saleDetail => saleDetail.sale, { eager: true })
    details: SaleDetail[];
}
