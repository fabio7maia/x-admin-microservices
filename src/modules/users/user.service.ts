import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { ConfigurationsDbService } from '../configurations';
import { UserServiceInput } from './types';
import { BaseService } from '../base/base.service';
import { basename } from 'path';

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

  async create(userId: string, payload: UserServiceInput) {
    let allowCreateUsers = true;

    const allowCreateUsersConfig = await this.configurationsDbService.getByKey(
      'allowRegisterUsers',
    );

    allowCreateUsers = allowCreateUsersConfig.length
      ? allowCreateUsersConfig[0].value === 'true'
      : allowCreateUsers;

    if (!allowCreateUsers) {
      throw new NotAcceptableException('Register new users is not allowed');
    }

    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    payload.password = crypto
      .createHmac('sha256', payload.password)
      .digest('hex');

    return super.create(userId, payload);
  }

  async update(userId: string, id: string, payload: UserServiceInput) {
    payload.password = crypto
      .createHmac('sha256', payload.password)
      .digest('hex');

    return super.update(userId, id, payload);
  }
}