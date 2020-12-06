import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Type } from './type.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class TypesService extends BaseService<Type> {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {
    super(typeRepository);
  }
}
