import { Module } from '@nestjs/common';
import { ProductPricesService } from './product.prices.service';
import { ProductPricesController } from './product.prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPrice } from './entities/product.price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPrice])],
  controllers: [ProductPricesController],
  providers: [ProductPricesService],
})
export class ProductPricesModule {}
