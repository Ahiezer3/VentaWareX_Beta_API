import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.productService.create(createProductDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() => this.productService.findAll());
  }

  @Get('findAllPaginated')
  async findAllPaginated(
    @Query('page') page: string = "1",
    @Query('limit') limit: string = "30",
  ) {
    let response = new MyResponse();
  
    const pageNumber = isNaN(Number(page)) || Number(page) <= 0 ? 1 : Number(page);
    const limitNumber = isNaN(Number(limit)) || Number(limit) <= 0 ? 30 : Math.min(Number(limit), 100);
  
    return await response.generateResponse(() => this.productService.findAllPaginated(pageNumber, limitNumber,"",""));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.productService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.productService.update(+id, updateProductDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.productService.remove(+id));
  }
}
