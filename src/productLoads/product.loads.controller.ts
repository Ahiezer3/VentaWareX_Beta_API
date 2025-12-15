import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductLoadsService } from './product.loads.service';
import { CreateProductLoadDto } from './dto/create-product.load.dto';
import { UpdateProductLoadDto } from './dto/update-product.load.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('productLoads')
export class ProductLoadsController {
  constructor(private readonly loadsService: ProductLoadsService) {}

  @Post()
  async create(@Body() createLoadDto: CreateProductLoadDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.loadsService.createLoadProduct(createLoadDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() => this.loadsService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.loadsService.findByKeyProduct(+id));
  }

  @Get('/loads/:id')
  async findLoads(@Param('id') id: string, 
  @Query('page') page: string = "1",
  @Query('limit') limit: string = "30") {

    let response = new MyResponse();

    const pageNumber = isNaN(Number(page)) || Number(page) <= 0 ? 1 : Number(page);
    const limitNumber = isNaN(Number(limit)) || Number(limit) <= 0 ? 30 : Math.min(Number(limit), 100);

    return await response.generateResponse(() => this.loadsService.findByKeyProductPaginated(+id,pageNumber, limitNumber,"",""));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLoadDto: UpdateProductLoadDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.loadsService.update(+id, updateLoadDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.loadsService.remove(+id));
  }
  
}
