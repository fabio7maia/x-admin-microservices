import { Injectable } from '@nestjs/common';
import { ConfigurationsService } from './../configurations';

@Injectable()
export class AppService {
  constructor(private configurationsService: ConfigurationsService) {}

  root(): string {
    return this.configurationsService.get('APP_URL');
  }
}
