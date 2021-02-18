import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entity } from './entity.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class EntitiesService extends BaseService<Entity> {
  constructor(
    @InjectRepository(Entity)
    private readonly entityRepository: Repository<Entity>,
  ) {
    super(entityRepository);
  }
}
