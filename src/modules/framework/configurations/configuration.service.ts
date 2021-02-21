import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './configuration.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class ConfigurationsService extends BaseService<Configuration> {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>,
  ) {
    super(configurationRepository);
  }

  async getByKey(key: string) {
    return this.configurationRepository.find({ key });
  }
}
