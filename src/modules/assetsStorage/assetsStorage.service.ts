import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import {
  AssetStorageErrorResponse,
  AssetStorageSuccessResponse,
  FileUpload,
} from './assetsStorage.types';

@Injectable()
export class AssetsStorageService {
  private getPublicId = (url: string): string => {
    const parts = url.split('/');
    const imageName = parts[parts.length - 1];
    return imageName.substr(0, imageName.indexOf('.'));
  };

  async uploadImage(
    file: FileUpload,
  ): Promise<AssetStorageSuccessResponse | AssetStorageErrorResponse> {
    const base64 = file.base64;

    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        base64,
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject({
              code: error.http_code,
              message: error.message,
              exception: error,
            });
          }

          resolve({
            identifier: result.public_id,
            url: result.url,
          });
        },
      );
    });
  }

  async replaceImage(
    url: string,
    file: FileUpload,
  ): Promise<AssetStorageSuccessResponse | AssetStorageErrorResponse> {
    const fromPublicId = this.getPublicId(url);
    const res = await this.uploadImage(file);

    return new Promise((resolve, reject) => {
      v2.uploader.rename(
        fromPublicId,
        res.identifier,
        { invalidate: true },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject({
              code: error.http_code,
              message: error.message,
              exception: error,
            });
          }

          resolve({
            identifier: result.public_id,
            url: result.url,
          });
        },
      );
    });
  }

  async deleteImage(
    url: string,
  ): Promise<AssetStorageSuccessResponse | AssetStorageErrorResponse> {
    const publicId = this.getPublicId(url);

    return new Promise((resolve, reject) => {
      v2.uploader.destroy(
        publicId,
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject({
              code: error.http_code,
              message: error.message,
              exception: error,
            });
          }

          resolve({
            identifier: result.public_id,
            url: result.url,
          });
        },
      );
    });
  }
}
