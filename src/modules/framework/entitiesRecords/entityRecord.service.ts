import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityRecord } from './entityRecord.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class EntitiesRecordsService extends BaseService<EntityRecord> {
  constructor(
    @InjectRepository(EntityRecord)
    private readonly entityRecordRepository: Repository<EntityRecord>,
  ) {
    super(entityRecordRepository);
  }
}
