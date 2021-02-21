import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Translation } from './translation.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class TranslationService extends BaseService<Translation> {
  constructor(
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
  ) {
    super(translationRepository);
  }

  async getByKey(key: string) {
    return this.translationRepository.find({ key });
  }
}
