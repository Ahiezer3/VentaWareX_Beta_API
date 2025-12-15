import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { TokensModule } from './tokens/tokens.module';
import { ProductPricesModule } from './productPrices/product.prices.module';
import { ProductLoadsModule } from './productLoads/product.loads.module';
import { CustomersModule } from './customers/customers.module';
import { SalesModule } from './sales/sales.module';
import { SaleDetailsModule } from './sale-details/sale-details.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { BusinessModule } from './business/business.module';
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',

      host:'localhost',
      port:3306,
      username:'root',
      password:'',

      database:'ventawarex',
      autoLoadEntities:true,
      synchronize:true
    }),
    UsersModule,
    TokensModule,
    ProductPricesModule,
    ProductLoadsModule,
    ProductsModule,
    CustomersModule,
    SalesModule,
    SaleDetailsModule,
    WarehousesModule,
    BusinessModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
