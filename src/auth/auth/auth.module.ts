import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/service/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './Jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'mytoken123#', // Clave secreta para firmar los tokens
      signOptions: { expiresIn: '168h' }, // El token expirará en 168 horas
    }),
    forwardRef(() => UsersModule)
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
