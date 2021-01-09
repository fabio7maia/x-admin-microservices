import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { ConfigurationsDbService } from '../configurations';
import { UserServiceInput } from './types';
import { BaseService } from '../base/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configurationsDbService: ConfigurationsDbService,
  ) {
    super(userRepository);
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.find({ email });

    return user && user.length > 0 ? user[0] : null;
  }

  async getByEmailAndPass(email: string, password: string) {
    const passHash = crypto.createHmac('sha256', password).digest('hex');

    const user = await this.userRepository.find({ email, password: passHash });

    return user && user.length > 0 ? user[0] : null;
  }

  async getByEmailAndProviderId(email: string, providerId: string) {
    const user = await this.userRepository.find({ email, providerId });

    return user && user.length > 0 ? user[0] : null;
  }

  async create(userId: string, payload: UserServiceInput) {
    let allowCreateUsers = false;

    const allowCreateUsersConfig = await this.configurationsDbService.getByKey(
      'allowRegisterUsers',
    );

    const allowCreateUsersConfigApp =
      payload.app &&
      (await this.configurationsDbService.getByKey(
        `allowRegisterUsers.${payload.app}`,
      ));

    if (allowCreateUsersConfigApp && allowCreateUsersConfigApp.length) {
      allowCreateUsers = allowCreateUsersConfigApp[0].value === 'true';
    } else if (allowCreateUsersConfig && allowCreateUsersConfig.length) {
      allowCreateUsers = allowCreateUsersConfig[0].value === 'true';
    }

    if (!allowCreateUsers) {
      throw new NotAcceptableException('Register new users is not allowed');
    }

    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    console.log('UsersService > create', { userId, payload });

    return super.create(userId, payload);
  }

  async update(userId: string, id: string, payload: UserServiceInput) {
    payload.password = crypto
      .createHmac('sha256', payload.password)
      .digest('hex');

    return super.update(userId, id, payload);
  }
}
