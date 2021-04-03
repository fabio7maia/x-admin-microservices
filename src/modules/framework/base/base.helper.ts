import { getConnection } from 'typeorm';
import { REDIS_CACHE_KEYS } from '../../../constants';
import { RedisCacheService } from '../../redisCache';
import { PuzzleFrameworkContextHeader } from './base.types';

export abstract class BaseHelper {
  static readonly isAuthenticatedUser = (req: {
    user?: { id: string };
  }): boolean => {
    return req.user !== undefined;
  };

  static readonly getCurrentUserId = (req: {
    user?: { id: string };
  }): string => {
    return (req.user && req.user.id) || '__system__';
  };

  static readonly getGuid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  static readonly getCurrentCompanyId = (req: any): string | undefined => {
    const pzlFwCtxValue = req.headers['pzl-fw-ctx'];

    const pzlFwCtx: PuzzleFrameworkContextHeader | undefined = pzlFwCtxValue
      ? JSON.parse(pzlFwCtxValue)
      : undefined;

    return pzlFwCtx?.companyId;
  };

  static readonly getCurrentCompanyIdBasedOnOriginUrl = async (
    req: any,
    redisCacheService: RedisCacheService,
  ): Promise<string | undefined> => {
    const pzlFwCtxValue = req.headers['pzl-fw-ctx'];

    return new Promise(async (resolve, reject) => {
      // return company id passed by header (backoffice)
      if (pzlFwCtxValue) {
        const pzlFwCtx: PuzzleFrameworkContextHeader | undefined = pzlFwCtxValue
          ? JSON.parse(pzlFwCtxValue)
          : undefined;

        return resolve(pzlFwCtx?.companyId);
      }

      // return company id based on origin url
      const referer = req.headers['referer'];
      const originUrl = new URL(referer).origin;

      // redisCacheService.set(REDIS_CACHE_KEYS.activeCompanies, {}, { ttl: 1 });

      const cachedCompanies = await redisCacheService.getOrDefault<
        Record<string, string>
      >(
        REDIS_CACHE_KEYS.activeCompanies,
        async () => {
          const companiesResult = await getConnection().query(
            'select * from companies where active = 1',
          );

          const companies: Record<string, string> = {};

          for (const c of companiesResult) {
            companies[c.url] = c.id;
          }

          return companies;
        },
        { ttl: 3600 },
      );

      return resolve(cachedCompanies[originUrl]);
    });
  };
}
