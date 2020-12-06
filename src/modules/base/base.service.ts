import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository, FindManyOptions, DeleteResult } from 'typeorm';

export interface IBaseService<T> {
  get(id: string): Promise<T>;
  all(options?: FindManyOptions): Promise<T[]>;
  create(userId: string, payload: T): Promise<T>;
  update(userId: string, id: string, payload: T): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
}

export class BaseService<T> implements IBaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async get(id: string): Promise<T> {
    return this.repository.findOne(id);
  }

  async all(options?: FindManyOptions): Promise<T[]> {
    return this.repository.find(options);
  }

  async create(userId: string, payload: T): Promise<T> {
    const newRecord = { ...payload, createdBy: userId, createdOn: new Date() };

    return this.repository.save(this.repository.create(newRecord));
  }

  async update(userId: string, id: string, payload: T): Promise<T> {
    const savedRecord = await this.get(id);

    if (savedRecord) {
      const editRecord = {
        ...payload,
        modifiedBy: userId,
        modifiedOn: new Date(),
      };

      return this.repository.save(
        this.repository.merge(savedRecord, editRecord),
      );
    }

    return null;
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
