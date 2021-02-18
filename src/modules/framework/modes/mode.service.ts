import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Mode } from './mode.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class ModesService extends BaseService<Mode> {
  constructor(
    @InjectRepository(Mode)
    private readonly modeRepository: Repository<Mode>,
  ) {
    super(modeRepository);
  }
}
