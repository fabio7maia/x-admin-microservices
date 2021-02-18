import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPermission } from './userPermission.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class UsersPermissionsService extends BaseService<UserPermission> {
  constructor(
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {
    super(userPermissionRepository);
  }
}
