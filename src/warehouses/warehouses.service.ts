import { Injectable } from '@nestjs/common';
import { MyService } from 'src/service/my-service/my.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehousesService extends MyService{

  constructor(@InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>) {
    super(warehouseRepository);
  }
}
