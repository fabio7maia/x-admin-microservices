import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './assetsStorage.provider';
import { AssetsStorageService } from './assetsStorage.service';

@Module({
  imports: [ConfigModule],
  providers: [AssetsStorageService, CloudinaryProvider],
  exports: [AssetsStorageService],
})
export class AssetsStorageModule {}
