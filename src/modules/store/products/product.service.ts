import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StoreProduct } from './product.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class StoreProductService extends BaseService<StoreProduct> {
  constructor(
    @InjectRepository(StoreProduct)
    private readonly storeProductRepository: Repository<StoreProduct>,
  ) {
    super(storeProductRepository);
  }
}
