import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async createToken(user: User): Promise<AuthLoginServiceOutput> {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
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
    const { email, providerId, imageUrl } = payload;
    let user = await this.usersService.getByEmail(email);

    if (!user) {
      user = await this.usersService.create(userId, {
        ...payload,
        active: true,
      });
    } else {
      user = await this.usersService.update(
        user.id,
        user.id,
        {
          ...user,
          imageUrl,
          providerId,
        },
        true,
      );
    }

    // console.log('user >>', { user });

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
