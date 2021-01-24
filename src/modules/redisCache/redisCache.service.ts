import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  get = async <T extends any>(key): Promise<T> => {
    return await this.cache.get(key);
  };

  set = async (key, value) => {
    await this.cache.set(key, value);
  };
}