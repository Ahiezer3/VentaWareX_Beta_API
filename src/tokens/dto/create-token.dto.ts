import { CreateMyDto } from "src/dto/create-my.dto";

export class CreateTokenDto extends CreateMyDto{
    expirationDate: Date;
}
