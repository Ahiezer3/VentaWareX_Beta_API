import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'my_entity', synchronize:false})
export abstract class MyEntity {

    @PrimaryGeneratedColumn()
    key: number;

    @DeleteDateColumn()
    deleteDate: Date;

}