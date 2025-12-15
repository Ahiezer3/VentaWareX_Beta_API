import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateUserDto extends CreateMyDto{
    name: string;
    lastName: string;
    mothersLastName: string;
    birthday: Date | null;
    address: string;
    zipCode: number;
    country: string;
    email: string;
    password: string;
    typeUser: number;
    status: number;
}
