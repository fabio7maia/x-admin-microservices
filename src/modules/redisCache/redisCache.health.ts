import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { RedisCacheService } from './redisCache.service';

@Injectable()
export class RedisCacheHealthIndicator extends HealthIndicator {
  constructor(private readonly redisCacheService: RedisCacheService) {
    super();
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    try {
      const res = await this.redisCacheService.get('health');

      return this.getStatus(key, true);
    } catch (err) {
      console.log('RedisCacheHealthIndicator > error', { err });
      return this.getStatus(key, false);
    }
  }
}
