import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductPricesService } from './product.prices.service';
import { CreateProductPriceDto } from './dto/create-product.price.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('productPrices')
export class ProductPricesController {
  constructor(private readonly pricesService: ProductPricesService) {}

  @Post()
  async create(@Body() createPriceDto: CreateProductPriceDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.pricesService.createPricesProduct(createPriceDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() => this.pricesService.findAll());
  }

  @Get('findAllPaginated')
  async findAllPaginated(
    @Query('page') page: string = "1",
    @Query('limit') limit: string = "30",
  ) {
    let response = new MyResponse();
  
    const pageNumber = isNaN(Number(page)) || Number(page) <= 0 ? 1 : Number(page);
    const limitNumber = isNaN(Number(limit)) || Number(limit) <= 0 ? 30 : Math.min(Number(limit), 100);
  
    return await response.generateResponse(() => this.pricesService.findAllPaginated(pageNumber, limitNumber,"",""));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.pricesService.findByKeyProduct(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePriceDto: CreateProductPriceDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.pricesService.update(+id, updatePriceDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.pricesService.remove(+id));
  }
}
