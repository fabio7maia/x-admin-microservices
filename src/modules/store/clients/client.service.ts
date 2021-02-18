import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StoreClient } from './client.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class StoreClientService extends BaseService<StoreClient> {
  constructor(
    @InjectRepository(StoreClient)
    private readonly storeClientRepository: Repository<StoreClient>,
  ) {
    super(storeClientRepository);
  }
}
