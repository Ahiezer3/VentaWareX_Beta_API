import { MyEntity } from "src/entity/my.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Business extends MyEntity{

    @Column()
    keyUser: number;

    @Column()
    name: string;

    @Column()
    details: string;

    @Column()
    date: Date;
}
