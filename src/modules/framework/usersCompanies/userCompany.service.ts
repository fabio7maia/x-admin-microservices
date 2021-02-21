import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { UserCompany } from './userCompany.entity';
import { BaseService } from '../base/base.service';
import { Company } from '../companies';

@Injectable()
export class UsersCompaniesService extends BaseService<UserCompany> {
  constructor(
    @InjectRepository(UserCompany)
    private readonly usersCompanyRepository: Repository<UserCompany>,
  ) {
    super(usersCompanyRepository);
  }
}
