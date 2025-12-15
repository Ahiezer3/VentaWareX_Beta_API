import { Injectable, NotFoundException } from '@nestjs/common';
import { MyService } from 'src/service/my-service/my.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPrice } from './entities/product.price.entity';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { CreateMyDto } from 'src/dto/create-my.dto';
import { CreateProductPriceDto } from './dto/create-product.price.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductPricesService extends MyService{

  constructor(@InjectRepository(ProductPrice) private readonly productPriceRepository: Repository<ProductPrice>,
  private readonly connection: Connection) {
    super(productPriceRepository);
  }

  async validateExistsProduct(keyProduct: number, queryRunner: QueryRunner) {

    if (!keyProduct) {
      throw new NotFoundException("Datos inválidos.");
    }

    const product = await queryRunner.manager.findOne(Product, { where: { key: keyProduct } });

    if (!product) {
        throw new NotFoundException("El producto no se encontró.");
    }

    return product;

  }

  async createPricesProduct(createPriceDto: CreateMyDto) {

    const queryRunner = this.connection.createQueryRunner();
  
    try {

      await queryRunner.connect();
      await queryRunner.startTransaction();

      let productPrice = createPriceDto as CreateProductPriceDto;

      const product = await this.validateExistsProduct(productPrice.keyProduct, queryRunner);

      if (!product?.return) {
        productPrice.priceReturn = 0;
      }

      const key = productPrice.key;
      const keyProduct = productPrice.keyProduct;

      let productPriceFound = (productPrice.key ? await queryRunner.manager.findOne(ProductPrice, {where:{key:key}}) : null);

      if (productPriceFound) {

        if (productPriceFound.keyProduct !== keyProduct) {
          throw new NotFoundException("Los precios no corresponden al producto.");
        }

        Object.assign(new ProductPrice, productPriceFound);

        Object.assign(productPriceFound, {
          basePrice: parseFloat((productPrice.basePrice).toString()),
          basePriceTaxes: parseFloat((productPrice.basePriceTaxes).toString()),
          listOne: parseFloat((productPrice.listOne).toString()),
          listOneTaxes: parseFloat((productPrice.listOneTaxes).toString()),
          listTwo: parseFloat((productPrice.listTwo).toString()),
          listTwoTaxes: parseFloat((productPrice.listTwoTaxes).toString()),
          listThree: parseFloat((productPrice.listThree).toString()),
          listThreeTaxes: parseFloat((productPrice.listThreeTaxes).toString()),
          iva: parseFloat((productPrice.iva).toString()),
          ieps: parseFloat((productPrice.ieps).toString()),
          priceReturn: parseFloat((productPrice.priceReturn).toString())
        });

        let productPriceSaved = await queryRunner.manager.save(ProductPrice, productPriceFound);
        
        await queryRunner.commitTransaction();

        return productPriceSaved;

      } else {

        Object.assign(new ProductPrice, productPrice);
        
        let productPriceSaved = await queryRunner.manager.save(ProductPrice, productPrice);
        
        await queryRunner.commitTransaction();
        
        return productPriceSaved;
      }

    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw err;

    } finally {

      await queryRunner.release();

    }
  }

  async findOneByKeyProduct(keyProduct: number): Promise<ProductPrice | undefined> {
    return this.productPriceRepository.findOne({
      where: {
        keyProduct,
      },
    });
  }
  
  async findByKeyProduct(keyProduct: number): Promise<ProductPrice[]> {
    return this.productPriceRepository.find({
      where: {
        keyProduct,
      },
    });
  }
}
