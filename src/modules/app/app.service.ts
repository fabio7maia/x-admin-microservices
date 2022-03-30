import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as packageJson from '../../../package.json';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  root(): string {
    return this.configService.get('APP_URL');
  }

  version(): string {
    return packageJson.version;
  }
}
