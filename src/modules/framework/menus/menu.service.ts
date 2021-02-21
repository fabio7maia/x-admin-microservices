import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

import { Menu } from './menu.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class MenusService extends BaseService<Menu> {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {
    super(menuRepository);
  }
}
