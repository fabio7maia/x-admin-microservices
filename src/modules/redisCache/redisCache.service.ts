import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  get = async <T extends any>(key): Promise<T> => {
    return await this.cache.get(key);
  };

  set = async <T extends any>(
    key: string,
    value: T,
    options?: CachingConfig,
  ) => {
    await this.cache.set(key, value, options);
  };
}
