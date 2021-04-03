import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  get = async <T extends any>(key: string): Promise<T> => {
    return this.cache.get(key);
  };

  getOrDefault = async <T extends any>(
    key: string,
    callbackGetDefault: () => Promise<T>,
    options?: CachingConfig,
  ): Promise<T> => {
    const cachedValue = await this.cache.get<T>(key);

    if (!cachedValue) {
      const value = await callbackGetDefault();

      this.set<T>(key, value, options);

      return value;
    }

    return cachedValue;
  };

  set = async <T extends any>(
    key: string,
    value: T,
    options?: CachingConfig,
  ) => {
    await this.cache.set(key, value, options);
  };
}
