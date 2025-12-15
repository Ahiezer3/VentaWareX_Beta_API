import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.usersService.createUser(createUserDto));
  
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() => this.usersService.findAll());
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Req() request: Request) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.usersService.getProfile(request));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.usersService.findOne(+id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.usersService.updateUser(request, updateUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.usersService.remove(+id));
  }
}
