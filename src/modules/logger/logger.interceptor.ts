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
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();

        const req: Request = context.switchToHttp().getRequest();

        this.logger.log(
          `[${start.toString()} - ${end.toString()} > (${end - start}ms)] > ${
            req.url
          } > ${JSON.stringify(req.body)}`,
        );
      }),
      catchError(err => {
        this.logger.error(err);

        return throwError(() => err);
      }),
    );
  }
}
