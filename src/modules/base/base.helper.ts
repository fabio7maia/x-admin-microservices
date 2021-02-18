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

  static readonly getCurrentAppId = (req: any): string | undefined => {
    return req.headers['app-id'];
  };
}
