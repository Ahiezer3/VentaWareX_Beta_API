import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyService } from 'src/service/my-service/my.service';
import { SaleDetail } from './entities/sale-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleDetailsService extends MyService{
  
  constructor(@InjectRepository(SaleDetail) private readonly saleDetailsRepository: Repository<SaleDetail>) {
    super(saleDetailsRepository);
  }
}
