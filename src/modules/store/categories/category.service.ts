import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StoreCategory } from './category.entity';
import { BaseService } from '../../framework/base/base.service';

@Injectable()
export class StoreCategoryService extends BaseService<StoreCategory> {
  constructor(
    @InjectRepository(StoreCategory)
    private readonly storeCategoryRepository: Repository<StoreCategory>,
  ) {
    super(storeCategoryRepository);
  }
}
