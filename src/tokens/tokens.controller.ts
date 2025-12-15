import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { MyResponse } from 'src/response/MyResponse';
import { JwtAuthGuard } from 'src/auth/auth/Jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    let response = new MyResponse();
    return await response.generateResponse(() => this.tokensService.create(createTokenDto));
  }

  @Get()
  async findAll() {
    let response = new MyResponse();
    return await response.generateResponse(() =>this.tokensService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() =>this.tokensService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    let response = new MyResponse();
    return await response.generateResponse(() =>this.tokensService.update(+id, updateTokenDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = new MyResponse();
    return await response.generateResponse(() =>this.tokensService.remove(+id));
  }
}
