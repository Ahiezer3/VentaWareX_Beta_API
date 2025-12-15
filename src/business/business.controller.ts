import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async create(@Body() createBusinessDto: CreateBusinessDto) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.businessService.create(createBusinessDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.businessService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.businessService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.businessService.update(+id, updateBusinessDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.businessService.remove(+id));
  }
}
