import { MyEntity } from "src/entity/my.entity";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends MyEntity{

    @PrimaryGeneratedColumn()
    key: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    provider: string;

    @Column()
    provider_sku: string;

    @Column()
    category: string;

    @Column()
    measure: string;

    @Column()
    quantity: number;

    @Column()
    image: string;

    @DeleteDateColumn()
    deleteDate: Date;

    @Column()
    keyWarehouse: number;

    @Column()
    currentStock: number;

    @Column()
    currentStockReturn: number;

    @Column({ type: 'boolean', default: false })
    return: boolean;

}
