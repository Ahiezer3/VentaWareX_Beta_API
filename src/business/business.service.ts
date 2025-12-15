import { Injectable } from '@nestjs/common';
import { MyService } from 'src/service/my-service/my.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessService extends MyService{
  constructor(@InjectRepository(Business) private readonly businessRepository: Repository<Business>) {
    super(businessRepository);
  }
}
