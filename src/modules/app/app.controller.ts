import { Get, Controller } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { RedisCacheHealthIndicator } from '../redisCache';
import { AppService } from './app.service';

@Controller('api/app')
@ApiTags('App')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthCheckService: HealthCheckService,
    private readonly dbHealthIndicator: TypeOrmHealthIndicator,
    private readonly httpHealthIndicator: HttpHealthIndicator,
    private readonly redisCacheHealthIndicator: RedisCacheHealthIndicator,
  ) {}

  @ApiExcludeEndpoint()
  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('version')
  version(): string {
    return this.appService.version();
  }

  @Get('health-check')
  @HealthCheck()
  healthCheck() {
    return this.healthCheckService.check([
      () => this.dbHealthIndicator.pingCheck('database'),
      () =>
        this.httpHealthIndicator.pingCheck(
          'swagger',
          `${this.appService.root()}/api/docs`,
        ),
      () => this.redisCacheHealthIndicator.pingCheck('redis'),
    ]);
  }
}
