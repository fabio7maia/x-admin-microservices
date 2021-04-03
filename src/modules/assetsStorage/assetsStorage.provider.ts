import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (configService: ConfigService): void => {
    return v2.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  },
  inject: [ConfigService],
};
