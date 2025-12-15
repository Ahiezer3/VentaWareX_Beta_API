import { Module } from '@nestjs/common';
import { ProductLoadsService } from './product.loads.service';
import { ProductLoadsController } from './product.loads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLoad } from './entities/product.load.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLoad, Product])],
  controllers: [ProductLoadsController],
  providers: [ProductLoadsService],
})
export class ProductLoadsModule {}
