import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
      ) {}
    
      async validateUser(email: string, password: string): Promise<any> {

        const user = await this.usersService.findOneByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }

        throw new UnauthorizedException('Usuario o contraseña incorrectos');

      }
    
      async login(loginDto: any) {

        const user = await this.validateUser(loginDto.email, loginDto.password);
    
        const payload = { email: user.email, sub: user.key };

        return {
          access_token: this.jwtService.sign(payload),
        };

      }
  
}
