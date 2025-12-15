import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { MyService } from 'src/service/my-service/my.service';
import { CreateMyDto } from 'src/dto/create-my.dto';
import { CreateSalesDto } from './dto/create-sales.dto';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';

@Injectable()
export class SalesService extends MyService{
  
  constructor(@InjectRepository(Sale) private readonly salesRepository: Repository<Sale>, private readonly connection: Connection) {
    super(salesRepository);
  }
  
  async createSale(createDto: CreateMyDto) {

    const queryRunner = this.connection.createQueryRunner();
  
    try {

      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      let sale = await this.validateDto(createDto);

      Object.assign(sale, {date:new Date()});
  
      await this.validateExistsCustomer(sale.keyCustomer, queryRunner);
  
      const saleSaved = await queryRunner.manager.save(sale) as Sale;
  
      for (const saleDetail of sale.details) {

        let detail = new SaleDetail();
        Object.assign(detail, saleDetail);

        let productFound = await this.validateExistsProduct(detail.keyProduct, queryRunner) as Product;

        if (detail.price <= 0) {
          throw new NotFoundException("El producto '"+productFound.name+"'no es válido.");
        }
  
        let newExistence = Number(productFound.currentStock) - Number(detail.quantity);

        if (newExistence < 0) {
          throw new NotFoundException("El producto '"+productFound.name+"' no tiene existencias.");
        }
        
        if (productFound.return) {

          let newExistenceReturn = Number(productFound.currentStockReturn) + Number(detail.quantityReturn);
          Object.assign(productFound, {currentStockReturn: newExistenceReturn});
          
        }

        Object.assign(productFound, {currentStock: newExistence});
  
        Object.assign(detail, { keySale: saleSaved.key, sku: productFound.provider_sku });
  
        await queryRunner.manager.save(productFound);
        await queryRunner.manager.save(detail);
      }
  
      Object.assign(saleSaved, { details: sale.details });
  
      await queryRunner.commitTransaction();
  
      return saleSaved;
  
    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw err;

    } finally {

      await queryRunner.release();

    }
  }
  
  async validateExistsProduct(keyProduct: number, queryRunner: QueryRunner) {

    const product = await queryRunner.manager.findOne(Product, { where: { key: keyProduct } });
  
    if (!product) {
      throw new NotFoundException("El producto no se encontró.");
    }
  
    return product;

  }
  
  async validateExistsCustomer(keyCustomer: number, queryRunner: QueryRunner) {

    const customer = await queryRunner.manager.findOne(Customer, { where: { key: keyCustomer } });
  
    if (!customer) {
      throw new NotFoundException("El cliente no se encontró.");
    }
  
    return customer;

  }
  
  
  async validateDto(createDto: CreateMyDto) {

    if (!createDto) {
      throw new NotFoundException("La información no se recibió."); 
    }
    
    let sale = new Sale();
    Object.assign(sale, createDto);

    if(!sale.keyCustomer) {
      throw new NotFoundException("No se recibió el cliente.");
    }

    if(sale.details?.length == 0) {
      throw new NotFoundException("No se recibieron productos.");
    }

    // if(sale.subtotal <= 0 || sale.total <= 0) {
    //   throw new NotFoundException("La venta no es inválida.");
    // }

    return sale;
  }

  async getTotalByMonthForYear(currentYear: number): Promise<any>{
  
    const rows: any[] = await this.salesRepository
      .createQueryBuilder('sale')
      .select('MONTH(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City"))', 'month')
      .addSelect('SUM(sale.total)', 'total')
      .addSelect('SUM(sale.total - sale.totalCost)', 'totalGain')
      .where('YEAR(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City")) = :year', { year: currentYear })
      .groupBy('MONTH(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City"))')
      .getRawMany();

      return rows;
  }
  
  // Total por el mes actual
  async getTotalForCurrentMonth(month:number): Promise<any> {
    const currentYear = new Date().getFullYear();

    const row:any = await this.salesRepository
      .createQueryBuilder('sale')
      .select('SUM(sale.total)', 'total')
      .addSelect('SUM(sale.total - sale.totalCost)', 'totalGain')
      .where('YEAR(sale.date) = :year', { year: currentYear })
      .andWhere('MONTH(sale.date) = :month', { month: month })
      .getRawOne();

      return row;
  }

  // Total por rango de fechas
  async getTotalByDateRange(startDate: Date, endDate: Date): Promise<any> {
    return await this.salesRepository
      .createQueryBuilder('sale')
      .select('SUM(sale.total)', 'total')
      .where('sale.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getRawOne();
  }

   // Total por rango de fechas
async getTotalByDayByDateRange(startDate: Date, endDate: Date): Promise<any> {
  return await this.salesRepository
    .createQueryBuilder('sale')
    .select('DATE(sale.date)', 'date') // Agrupar por la fecha completa
    .addSelect('SUM(sale.total)', 'total')
    .addSelect('SUM(sale.total - sale.totalCost)', 'totalGain')
    .where('DATE(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City")) BETWEEN :startDate AND :endDate', { startDate, endDate })
    .groupBy('DATE(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City"))') // Agrupación por la fecha completa
    .orderBy('DATE(date)', 'ASC') // Ordenar los resultados por fecha
    .getRawMany(); // Obtener todos los resultados
}


  // Total por día para el mes actual
async getTotalByDayForCurrentMonth(month: number): Promise<any> {
  const currentYear = new Date().getFullYear();

  return this.salesRepository
    .createQueryBuilder('sale')
    .select('sale.date', 'date') // Agrupar y seleccionar por la fecha completa
    .addSelect('SUM(sale.total)', 'total')
    .addSelect('SUM(sale.total - sale.totalCost)', 'totalGain')
    .where('YEAR(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City")) = :year', { year: currentYear })
    .andWhere('MONTH(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City")) = :month', { month })
    .groupBy('DATE(CONVERT_TZ(sale.date, "UTC", "America/Mexico_City"))') // Agrupación por la fecha completa
    .orderBy('DATE(date)', 'ASC') // Ordenar los resultados por fecha
    .getRawMany();
}

  

}
