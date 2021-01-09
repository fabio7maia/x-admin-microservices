import * as crypto from 'crypto';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
  to(value) {
    return value ? crypto.createHmac('sha256', value).digest('hex') : undefined;
  }
  from(value) {
    return value;
  }
}
