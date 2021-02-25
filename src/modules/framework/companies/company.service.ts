import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from './company.entity';
import { BaseService } from '../base/base.service';
import { UserCompany } from '../usersCompanies';

@Injectable()
export class CompaniesService extends BaseService<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
    super(companyRepository);
  }

  getCompaniesByUser = (userId: string): Promise<Company[]> => {
    return this.companyRepository
      .createQueryBuilder('company')
      .innerJoin(
        UserCompany,
        'usersCompanies',
        'usersCompanies.companyId = company.id',
      )
      .where('usersCompanies.userId = :userId', { userId })
      .getMany();
  };
}
