import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { MyService } from 'src/service/my-service/my.service';

@Injectable()
export class TokensService extends MyService{

  constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) {
    super(tokenRepository);
  }

}
