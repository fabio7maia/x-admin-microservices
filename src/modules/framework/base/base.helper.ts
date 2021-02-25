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
}