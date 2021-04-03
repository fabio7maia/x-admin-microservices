import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { StoreProduct } from './product.entity';
import { BaseService } from '../../framework/base/base.service';
import { AssetsStorageService } from '../../assetsStorage';
import { BaseHelper } from '../../framework/base';

@Injectable()
export class StoreProductService extends BaseService<StoreProduct> {
  constructor(
    @InjectRepository(StoreProduct)
    private readonly storeProductRepository: Repository<StoreProduct>,
    private readonly assetsStorageService: AssetsStorageService,
  ) {
    super(storeProductRepository);
  }

  createProduct = async (req, payload: StoreProduct): Promise<StoreProduct> => {
    const res = await this.assetsStorageService.uploadImage(
      payload.imageFileUpload,
    );

    payload = {
      ...payload,
      image: res.url,
      companyId: BaseHelper.getCurrentCompanyId(req),
    };
    return this.create(BaseHelper.getCurrentUserId(req), payload);
  };

  updateProduct = async (
    req,
    id: string,
    payload: StoreProduct,
  ): Promise<StoreProduct> => {
    const product = await this.storeProductRepository.findOne(id);
    // when passed a new image, replace image in cloudinary
    if (payload.imageFileUpload) {
      await this.assetsStorageService.replaceImage(
        product.image,
        payload.imageFileUpload,
      );
    }
    payload = {
      ...product,
      ...payload,
    };
    return this.create(BaseHelper.getCurrentUserId(req), payload);
  };

  deleteProduct = async (id: string): Promise<DeleteResult> => {
    const product = await this.storeProductRepository.findOne(id);
    await this.assetsStorageService.deleteImage(product.image);
    return this.delete(id);
  };
}
