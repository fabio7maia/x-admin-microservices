import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StoreApp } from './app.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class StoreAppService extends BaseService<StoreApp> {
  constructor(
    @InjectRepository(StoreApp)
    private readonly storeAppRepository: Repository<StoreApp>,
  ) {
    super(storeAppRepository);
  }
}
