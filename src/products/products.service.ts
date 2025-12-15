import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { MyService } from 'src/service/my-service/my.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductPrice } from 'src/productPrices/entities/product.price.entity';

@Injectable()
export class ProductsService extends MyService{

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>, private readonly connection: Connection) {
    super(productRepository);
  }

  async validateExistsProductPrices(keyProduct: number, queryRunner: QueryRunner) {

    if (!keyProduct) {
      throw new NotFoundException("Datos inválidos.");
    }

    const productPrices = await queryRunner.manager.findOne(ProductPrice, { where: { keyProduct: keyProduct } });

    return productPrices;

  }

  async update(id: number, updateDto: UpdateProductDto) {
    
    const queryRunner = this.connection.createQueryRunner();
    let productFound = undefined;
    let productUpdate = undefined;

    try {

      await queryRunner.connect();
      await queryRunner.startTransaction();

      productFound = await this.entityExists(id) as Product;
      const currentStock = productFound.currentStock;
      const currentStockReturn = productFound.currentStockReturn;

      Object.assign(productFound, updateDto);
      productFound.currentStock = currentStock;
      productFound.currentStockReturn = currentStockReturn;

      productUpdate = await queryRunner.manager.save(Product,productFound);

      let productPriceFound = await this.validateExistsProductPrices(productFound.key, queryRunner);

      if (productPriceFound && !productFound.return) {

        Object.assign(productPriceFound, {
          priceReturn: parseFloat((0).toString())
        });

        await queryRunner.manager.save(ProductPrice, productPriceFound);

      }

      await queryRunner.commitTransaction();
  
    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw err;

    } finally {

      await queryRunner.release();

    }

    return productUpdate;
  }

}
