import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Functionality } from './functionality.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class FunctionalitiesService extends BaseService<Functionality> {
  constructor(
    @InjectRepository(Functionality)
    private readonly functionalityRepository: Repository<Functionality>,
  ) {
    super(functionalityRepository);
  }
}
