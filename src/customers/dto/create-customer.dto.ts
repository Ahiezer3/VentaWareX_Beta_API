import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateCustomerDto extends CreateMyDto{
    name: string;
    lastName: string;
    mothersLastName: string;
    address: string;
    zipCode: number;
    phoneNumber: string;
    listPrice: string;
    rfc: string;
    keyBusiness:number;
}
