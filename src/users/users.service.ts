import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MyService } from 'src/service/my-service/my.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService extends MyService{


  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
  private readonly jwtService: JwtService) {
    super(userRepository);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email:email });
  }

  async createUser(user:CreateUserDto) {

    const userExists = await this.findOneByEmail(user.email);

    if (userExists) {
      throw new NotFoundException("Este email no es válido.");
    }

    const hashedPassword = await this.hashPassword(user.password);

    Object.assign(user, {password:hashedPassword});

    return await this.userRepository.save(user);
  }

  async updateUser(request: Request, user:UpdateUserDto) {

    const token = this.getToken(request);

    const key:number = token.sub;

    let userFound = await this.userRepository.findOneBy({key:key});

    if (!userFound) {
      throw new NotFoundException("El usuario no existe.");
    }

    const userExists = await this.findOneByEmail(user.email);

    if (userExists && userExists.key !== key) {
      throw new NotFoundException("Este email no es válido.");
    }

    const hashedPassword = user.password ? await this.hashPassword(user.password) : userFound.password;

    Object.assign(userFound, {
      name: user.name,
      lastName: user.lastName,
      mothersLastName: user.mothersLastName,
      birthday: new Date(user.birthday),
      address: user.address,
      zipCode: user.zipCode,
      country: user.country,
      email: userFound.email,
      password: hashedPassword
    });

    return await this.userRepository.save(userFound);
  }

  async hashPassword(password: string): Promise<string> {

    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
    
  }

  async getProfile(request: Request) {

    const token = this.getToken(request);

    const userKey = token.sub;
    const email = token.email;

    let userFound = await this.userRepository.findOneBy({key:userKey});

    if (!userFound) {
      throw new NotFoundException("El usuario no existe.");
    }

    if (userFound.email != email) {
      throw new NotFoundException("Usuario inválido.");
    }
    
    userFound.password = null;
    
    return userFound;
  }

  getToken(request: Request): any {

    let token = request.headers["authorization"];
    token = token.replace("Bearer ", "");

    token = this.decodeJWT(token);

    return token;

  }

  decodeJWT(token: string): any {

    try {
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new Error('Failed to decode token');
    }

  }

}
