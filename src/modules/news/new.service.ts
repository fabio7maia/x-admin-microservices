import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

import { NewEntity } from './new.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class NewsService extends BaseService<NewEntity> {
  constructor(
    @InjectRepository(NewEntity)
    private readonly newRepository: Repository<NewEntity>,
  ) {
    super(newRepository);
  }

  async getByCreatedDate(createdDate: Date) {
    return this.newRepository.find({ createdOn: createdDate });
  }
}
