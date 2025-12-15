import { MyEntity } from "src/entity/my.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Customer extends MyEntity{

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    mothersLastName: string;

    @Column()
    address: string;

    @Column()
    zipCode: number;

    @Column()
    phoneNumber: string;

    @Column()
    listPrice: string;
    
    @Column()
    rfc: string;

    @Column()
    keyBusiness:number;
}
