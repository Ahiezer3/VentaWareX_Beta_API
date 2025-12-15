import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('sale-details')
export class SaleDetailsController {
  constructor(private readonly saleDetailsService: SaleDetailsService) {}

  @Post()
  async create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.saleDetailsService.create(createSaleDetailDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.saleDetailsService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.saleDetailsService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSaleDetailDto: UpdateSaleDetailDto) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.saleDetailsService.update(+id, updateSaleDetailDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.saleDetailsService.remove(+id));
  }
}
