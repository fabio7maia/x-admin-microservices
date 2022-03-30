import {
  Injectable,
  LoggerService as LoggerServiceNestJS,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Injectable()
export class LoggerService implements LoggerServiceNestJS {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    Sentry.captureMessage(message, Sentry.Severity.Log);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    Sentry.captureException(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    Sentry.captureMessage(message, Sentry.Severity.Warning);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    Sentry.captureMessage(message, Sentry.Severity.Debug);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    Sentry.captureMessage(message, Sentry.Severity.Info);
  }
}
