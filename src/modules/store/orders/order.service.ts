import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { BaseService } from '../../base/base.service';
import { StoreProduct } from '../products';
import { StoreOrder, StoreOrderProduct } from './order.entity';

@Injectable()
export class StoreOrderService extends BaseService<StoreOrderProduct> {
  constructor(
    @InjectRepository(StoreOrderProduct)
    private readonly storeOrderProductRepository: Repository<StoreOrderProduct>,
  ) {
    super(storeOrderProductRepository);
  }

  async createOrder(
    companyId: string,
    userId: string,
    products: StoreProduct[],
    address: string,
  ) {
    await getManager().transaction(async transactionalEntityManager => {
      const storeOrder = transactionalEntityManager.create(StoreOrder, {
        companyId: companyId,
        address,
      });

      if (storeOrder) {
        for (let product of products) {
          const store = transactionalEntityManager.create(StoreOrderProduct, {
            ...product,
            storeOrderId: storeOrder.id,
          });
        }
      }
    });
  }
}
