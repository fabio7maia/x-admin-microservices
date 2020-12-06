export abstract class BaseHelper {
  static readonly getCurrentUserId = (req: {
    user?: { id: string };
  }): string => {
    return (req.user && req.user.id) || '__system__';
  };
}
