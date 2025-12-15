import { MyEntity } from "src/entity/my.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Token extends MyEntity{

    @Column()
    keyUser: number;

    @Column()
    creationDate: Date;

    @Column()
    expirationDate: Date;

}
