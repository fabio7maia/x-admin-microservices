import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() => this.logger.log(`After... ${Date.now() - now}ms`)),
      catchError(err => {
        this.logger.error(err);

        return throwError(() => err);
      }),
    );
  }
}
