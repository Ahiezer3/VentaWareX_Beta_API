import { Injectable, NotFoundException } from '@nestjs/common';
import { MyService } from 'src/service/my-service/my.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLoad } from './entities/product.load.entity';
import { CreateProductLoadDto } from './dto/create-product.load.dto';
import { CreateMyDto } from 'src/dto/create-my.dto';
import { Product } from 'src/products/entities/product.entity';
import { Connection, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class ProductLoadsService extends MyService{

  constructor(@InjectRepository(ProductLoad) private readonly productLoadsRepository: Repository<ProductLoad>, 
  @InjectRepository(Product) private readonly producRepository: Repository<Product>,
  private readonly connection: Connection){
    super(productLoadsRepository);
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

  async createLoadProduct(createLoadDto: CreateMyDto) {

    const queryRunner = this.connection.createQueryRunner();
  
    try {

      await queryRunner.connect();
      await queryRunner.startTransaction();

      let productLoad = createLoadDto as CreateProductLoadDto;

      let product = await this.validateExistsProduct(productLoad.keyProduct, queryRunner);
      let loadTo: string = productLoad.loadTo;
      let currentStock: number = !isNaN(product.currentStock) ? Number(product.currentStock) : 0;
      let currentStockReturn: number = !isNaN(product.currentStockReturn) ? Number(product.currentStockReturn) : 0;
      let quantityLoad: number = !isNaN(productLoad.quantityLoad) ? Number(productLoad.quantityLoad) : 0;
      let newStock:number = 0;

      Object.assign(new Product(), product);
      Object.assign(new ProductLoad(), productLoad);

      if (loadTo == "product") {
        
        newStock = productLoad.loadType == "increase" ? currentStock + quantityLoad : currentStock - quantityLoad;
        
        Object.assign(product, {
          currentStock: newStock
        });

      } else {

        newStock = productLoad.loadType == "increase" ? currentStockReturn + quantityLoad : currentStockReturn - quantityLoad;
        
        Object.assign(product, {
          currentStockReturn: newStock
        });

      }

      Object.assign(productLoad, {
        loadTo: productLoad.loadTo,
        loadType: productLoad.loadType,
        currentStock: loadTo == "product" ? currentStock : currentStockReturn,
        quantityLoad: productLoad.quantityLoad,
        newStock: newStock,
        dateLoad: new Date(),
        commentsLoad: productLoad.commentsLoad
      });

      await queryRunner.manager.save(product);
      const productLoadSaved = await queryRunner.manager.save(ProductLoad, productLoad);

      await queryRunner.commitTransaction();

      return productLoadSaved;

    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw err;

    } finally {

      await queryRunner.release();

    }

  }

  async findOneByKeyProduct(keyProduct: number): Promise<ProductLoad | undefined> {
    return this.productLoadsRepository.findOne({
      where: {
        keyProduct:keyProduct,
      },
    });
  }
  
  async findByKeyProduct(keyProduct: number): Promise<ProductLoad[]> {
    return this.productLoadsRepository.find({
      where: {
        keyProduct:keyProduct,
      },
      order: {
        dateLoad: 'DESC'
      },
      // take: 20
    });
  }

  async findByKeyProductPaginated(keyProduct: number, page: number = 1, limit: number = 30, sortField: string, 
    sortOrder: string): Promise<{ data: any[]; total: number; page: number; limit: number,
    
  }> {
    page = page <= 0 ? 1 : page;
    sortField = sortField || "key";
    sortOrder = sortOrder || "DESC";

    const [data, total] = await this.productLoadsRepository.findAndCount({
      where: {
        keyProduct:keyProduct,
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sortField]: sortOrder,
      },
    });

    return await {
      data,
      total,
      page,
      limit,
    };
}
}
