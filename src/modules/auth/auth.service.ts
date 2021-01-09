import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationsService } from './../configurations';
import { User, UsersService } from './../users';
import {
  AuthLoginServiceOutput,
  AuthLoginServiceInput,
  AuthLoginExternalProviderServiceInput,
  AuthRegisterServiceInput,
} from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationsService: ConfigurationsService,
    private readonly usersService: UsersService,
  ) {}

  async createToken(user: User): Promise<AuthLoginServiceOutput> {
    return {
      expiresIn: this.configurationsService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user: user,
    };
  }

  async validateUser(payload: AuthLoginServiceInput): Promise<User> {
    const user = await this.usersService.getByEmailAndPass(
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

  async treatLoginFromExternalProvider(
    userId: string,
    payload: AuthLoginExternalProviderServiceInput,
  ): Promise<User> {
    let user = await this.usersService.getByEmailAndProviderId(
      payload.email,
      payload.providerId,
    );

    if (!user) {
      user = await this.usersService.create(userId, {
        ...payload,
        active: true,
      });
    }

    if (!user.active) {
      throw new InternalServerErrorException('User is inactve.');
    }

    return user;
  }

  async register(
    userId: string,
    payload: AuthRegisterServiceInput,
  ): Promise<User> {
    const user = await this.usersService.create(userId, {
      ...payload,
      active: false,
    });

    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }

    if (!user.active) {
      throw new InternalServerErrorException('User is inactve.');
    }

    return user;
  }
}
