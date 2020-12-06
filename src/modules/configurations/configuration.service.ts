import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigurationsService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if (process.env.APP_ENV === 'production') {
      this.envConfig = process.env;
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}
