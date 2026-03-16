import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  register(dto: RegisterDto) {
    return this.usersService.create(dto);
  }

  login(dto: LoginDto) {
    const user = this.usersService.findByEmail(dto.email);
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // stub token
    const { password, ...rest } = user;
    return { accessToken: 'fake-jwt-token', user: rest };
  }
}
