import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  checkHealth(): string {
    return 'OK';
  }

  @Get('createTestUser')
  createTestUser(): string {
    var createUserDto:CreateUserDto  =  {
      name: "Test",
      lastName: "Test",
      mothersLastName: "Test",
      birthday: new Date(),
      address: "Test",
      zipCode: 12345,
      country: "Test",
      email: "test@test.com",
      password: "Test123",
      typeUser: 1,
      status: 1
    }

    this.usersService.createUser(createUserDto);
    return 'User "Test" created. \n Email: test@test.com \n Password: Test123';
  }
}
