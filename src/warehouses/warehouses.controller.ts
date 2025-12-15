import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.warehousesService.create(createWarehouseDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.warehousesService.findAll());
  }

  @Get('findAllPaginated')
  async findAllPaginated(
    @Query('page') page: string = "1",
    @Query('limit') limit: string = "30",
  ) {
    let response = new MyResponse();
  
    const pageNumber = isNaN(Number(page)) || Number(page) <= 0 ? 1 : Number(page);
    const limitNumber = isNaN(Number(limit)) || Number(limit) <= 0 ? 30 : Math.min(Number(limit), 100);
  
    return await response.generateResponse(() => this.warehousesService.findAllPaginated(pageNumber, limitNumber,"",""));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.warehousesService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.warehousesService.update(+id, updateWarehouseDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.warehousesService.remove(+id));
  }
}
