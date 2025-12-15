import { MyEntity } from "src/entity/my.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ProductLoad extends MyEntity{
    @Column()
    keyProduct: number;

    @Column()
    loadTo: string;

    @Column()
    loadType: string;

    @Column()
    currentStock: number;

    @Column()
    quantityLoad: number;

    @Column()
    newStock: number;

    @Column()
    dateLoad: Date;

    @Column({nullable:true})
    commentsLoad: string;
}
