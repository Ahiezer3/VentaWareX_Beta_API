import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.customersService.create(createCustomerDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() => this.customersService.findAll());
  }

  @Get('findAllPaginated')
  async findAllPaginated(
    @Query('page') page: string = "1",
    @Query('limit') limit: string = "30",
  ) {
    let response = new MyResponse();
  
    const pageNumber = isNaN(Number(page)) || Number(page) <= 0 ? 1 : Number(page);
    const limitNumber = isNaN(Number(limit)) || Number(limit) <= 0 ? 30 : Math.min(Number(limit), 100);
  
    return await response.generateResponse(() => this.customersService.findAllPaginated(pageNumber, limitNumber,"",""));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.customersService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.customersService.update(+id, updateCustomerDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.customersService.remove(+id));
  }
}
