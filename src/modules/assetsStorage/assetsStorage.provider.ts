import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { TransformHelper } from '../../helpers';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (configService: ConfigService): void => {
    const cloudinaryUrl = configService.get('CLOUDINARY_URL');
    let cloudinaryCloudName = configService.get('CLOUDINARY_CLOUD_NAME');
    let cloudinaryApiKey = configService.get('CLOUDINARY_API_KEY');
    let cloudinaryApiSecret = configService.get('CLOUDINARY_API_SECRET');

    if (cloudinaryUrl.length) {
      const res = TransformHelper.extractValue(
        cloudinaryUrl,
        'cloudinary://{{cloudinaryCloudName}}:{{cloudinaryApiKey}}@{{cloudinaryApiSecret}}',
      );

      cloudinaryCloudName = res.cloudinaryCloudName;
      cloudinaryApiKey = res.cloudinaryApiKey;
      cloudinaryApiSecret = res.cloudinaryApiSecret;
    }

    return v2.config({
      cloud_name: cloudinaryCloudName,
      api_key: cloudinaryApiKey,
      api_secret: cloudinaryApiSecret,
    });
  },
  inject: [ConfigService],
};
