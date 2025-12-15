import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyService } from 'src/service/my-service/my.service';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService extends MyService{
  constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) {
    super(customerRepository);
  }
}
