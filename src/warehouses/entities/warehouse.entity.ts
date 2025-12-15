import { MyEntity } from "src/entity/my.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Warehouse extends MyEntity{

    @Column()
    keyBusiness: number;

    @Column()
    name: string;

    @Column()
    details: string;
}
