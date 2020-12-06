import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Configuration } from './configuration.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class ConfigurationsDbService extends BaseService<Configuration> {
  constructor(
    @InjectRepository(Configuration)
    private readonly configRepository: Repository<Configuration>,
  ) {
    super(configRepository);
  }

  async getByKey(key: string) {
    return this.configRepository.find({ key });
  }
}
