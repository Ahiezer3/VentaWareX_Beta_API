import { MyEntity } from "src/entity/my.entity";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends MyEntity{
    
    @PrimaryGeneratedColumn()
    key: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    mothersLastName: string;

    @Column({ type: 'datetime', nullable: true })
    birthday: Date | null;

    @Column()
    address: string;

    @Column()
    zipCode: number;

    @Column()
    country: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    typeUser: number;

    @Column()
    status: number;

    @DeleteDateColumn()
    deleteDate: Date;


    @BeforeInsert()
    @BeforeUpdate()
    validateBirthday() {
      if (this.birthday && this.birthday.toISOString() === '0000-00-00T00:00:00.000Z') {
        this.birthday = null;
      }
    }
}
