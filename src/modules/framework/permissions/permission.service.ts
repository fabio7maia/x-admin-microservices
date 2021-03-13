import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from './permission.entity';
import { BaseService } from '../base/base.service';
import { UserPermission } from '../usersPermissions';

@Injectable()
export class PermissionsService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {
    super(permissionRepository);
  }

  getPermissionsByUser = (userId: string): Promise<Permission[]> => {
    return this.permissionRepository
      .createQueryBuilder('permission')
      .innerJoin(
        UserPermission,
        'usersPermissions',
        'usersPermissions.permissionId = permission.id',
      )
      .where('usersPermissions.userId = :userId', { userId })
      .getMany();
  };
}
