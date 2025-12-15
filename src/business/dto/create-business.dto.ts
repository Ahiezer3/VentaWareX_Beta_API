import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateBusinessDto extends CreateMyDto{
    keyUser: number;
    name: string;
    details: string;
    date: Date;
}
