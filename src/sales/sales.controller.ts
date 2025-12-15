import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { UpdateSalesDto } from './dto/update-sales.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSalesDto: CreateSalesDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.salesService.createSale(createSalesDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() =>  this.salesService.findAll());
  }

  @Get('findAllPaginated')
  async findAllPaginated(
    @Query('page') page: string = "1",
    @Query('limit') limit: string = "30",
  ) {
    let response = new MyResponse();
  
    const pageNumber = isNaN(Number(page)) || Number(page) <= 0 ? 1 : Number(page);
    const limitNumber = isNaN(Number(limit)) || Number(limit) <= 0 ? 30 : Math.min(Number(limit), 100);
  
    return await response.generateResponse(() => this.salesService.findAllPaginated(pageNumber, limitNumber,"",""));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.salesService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSalesDto: UpdateSalesDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.salesService.update(+id, updateSalesDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.salesService.remove(+id));
  }

  @Get("test")
  async test(){
    console.log("test");
  }

  //Reporte total por mes para el año actual
  @Get('totalByMonthForYear/:year')
  async getTotalByMonthForYear(@Param('year') yearString: string) { 

    const year = parseInt(yearString);
    
    if (isNaN(year)) {
      throw new BadRequestException('El parámetro year no es válido');
    }

    let response = new MyResponse();
    return await response.generateResponse(() => this.salesService.getTotalByMonthForYear(year));
  }

  // Reporte total por el mes actual
  @Get('totalCurrentMonth/:month')
  async getTotalForCurrentMonth(@Param('month') monthString: string) {

    const month = parseInt(monthString);
    
    if (isNaN(month)) {
      throw new BadRequestException('El parámetro month no es válido');
    }

    let response = new MyResponse();
    return await response.generateResponse(() => this.salesService.getTotalForCurrentMonth(month));
  }

  // Reporte total por rango de fechas
  @Get('totalByDateRange/:startDate&:endDate')
  async getTotalByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {

    const startDateParam = new Date(parseInt(startDate));
    const endDateParam = new Date(parseInt(endDate));

    let response = new MyResponse();

    return await response.generateResponse(() => this.salesService.getTotalByDateRange(startDateParam,endDateParam));
  }

  // Reporte total por rango de fechas
  @Get('totalByDayByDateRange/:startDate&:endDate')
  async getTotalByDayByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {

    const startDateParam = new Date(startDate);
    const endDateParam = new Date(endDate);

    startDateParam.setHours(0);
    startDateParam.setMinutes(0);
    startDateParam.setSeconds(0);

    endDateParam.setHours(23);
    endDateParam.setMinutes(59);
    endDateParam.setSeconds(59);

    let response = new MyResponse();

    return await response.generateResponse(() => this.salesService.getTotalByDayByDateRange(startDateParam,endDateParam));
  }

  // Reporte total por día para el mes actual
  @Get('totalByDayCurrentMonth/:month')
  async getTotalByDayForCurrentMonth(@Param('month') monthString: string) {

    const month = parseInt(monthString);
    
    if (isNaN(month)) {
      throw new BadRequestException('El parámetro month no es válido');
    }

    let response = new MyResponse();
    return await response.generateResponse(() => this.salesService.getTotalByDayForCurrentMonth(month));
  }

}
