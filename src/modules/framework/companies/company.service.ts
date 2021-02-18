import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from './company.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class CompaniesService extends BaseService<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
    super(companyRepository);
  }
}
