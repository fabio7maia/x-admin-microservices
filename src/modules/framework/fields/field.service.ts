import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Field } from './field.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class FieldsService extends BaseService<Field> {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {
    super(fieldRepository);
  }
}
