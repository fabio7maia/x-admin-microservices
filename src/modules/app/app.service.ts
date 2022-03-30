import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as packageJson from '../../../package.json';
import { LoggerService } from '../logger';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  root(): string {
    return this.configService.get('APP_URL');
  }

  version(): string {
    return packageJson.version;
  }
}
