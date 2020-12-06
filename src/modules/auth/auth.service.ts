import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationsService } from './../configurations';
import { User, UsersService } from './../users';
import { AuthLoginServiceOutput, AuthLoginServiceInput } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationsService: ConfigurationsService,
    private readonly userService: UsersService,
  ) {}

  async createToken(user: User): Promise<AuthLoginServiceOutput> {
    return {
      expiresIn: this.configurationsService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user: user,
    };
  }

  async validateUser(payload: AuthLoginServiceInput): Promise<User> {
    const user = await this.userService.getByEmailAndPass(
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    if (!user.active) {
      throw new InternalServerErrorException('User is inactve.');
    }
    return user;
  }
}
