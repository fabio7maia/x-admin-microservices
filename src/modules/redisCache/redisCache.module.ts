import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { TransformHelper } from '../../helpers';
import { RedisCacheService } from './redisCache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get('REDIS_URL');
        let redisHost = configService.get('REDIS_HOST');
        let redisPort = configService.get('REDIS_PORT');
        let redisPassword = configService.get('REDIS_PASSWORD');
        let redisTtl = configService.get('REDIS_TTL');

        if (redisUrl.length) {
          const res = TransformHelper.extractValue(
            redisUrl,
            'redis://:{{redisPassword}}@{{redisHost}}:{{redisPort}}',
          );

          redisHost = res.redisHost;
          redisPort = res.redisPort;
          redisPassword = res.redisPassword;
        }

        return {
          store: redisStore,
          host: redisHost,
          port: redisPort,
          auth_pass: redisPassword,
          ttl: redisTtl,
        };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
  controllers: [],
})
export class RedisCacheModule {}
