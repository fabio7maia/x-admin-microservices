import { Param, Req, Body } from '@nestjs/common';
import { Like, DeleteResult } from 'typeorm';
import { IBaseService } from './base.service';
import { BaseEntity } from './base.entity';
import { IFieldsOrder } from './models/filter.model';
import { Request } from 'express';
import { BaseHelper } from './base.helper';

export abstract class BaseController<T extends BaseEntity> {
  constructor(readonly service: IBaseService<T>) {}

  async getListOfRecords(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<T[]> {
    const where = {};

    if (req.query) {
      const id = req.query.id;

      if (id) {
        where['id'] = id;
      }

      const name = req.query.name;
      if (name) {
        where['name'] = Like(`%${name}%`);
      }

      const module = req.query.module;
      if (name) {
        where['module'] = Like(`%${module}%`);
      }

      const language = req.query.language;
      if (name) {
        where['language'] = Like(`%${language}%`);
      }
    }

    return await this.service.all({ where, order });
  }

  async getRecordById(@Param('id') id: string): Promise<T> {
    return await this.service.get(id);
  }

  async createRecord(@Req() req, @Body() payload: T): Promise<T> {
    return await this.service.create(BaseHelper.getCurrentUserId(req), payload);
  }

  async updateRecord(
    @Req() req,
    @Param('id') id: string,
    @Body() payload: T,
  ): Promise<T> {
    return await this.service.update(
      BaseHelper.getCurrentUserId(req),
      id,
      payload,
    );
  }

  async deleteRecord(@Param('id') id: string): Promise<DeleteResult> {
    return await this.service.delete(id);
  }
}
