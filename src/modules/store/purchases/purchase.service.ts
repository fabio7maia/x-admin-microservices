import { Injectable } from '@nestjs/common';
import { StoreOrderService } from '../orders';
import { StorePurchaseInput, StorePurchaseOutput } from './purchase.models';

@Injectable()
export class StorePurchaseService {
  constructor(private readonly storeOrderService: StoreOrderService) {}

  private async checkStocks(
    appId: string,
    userId: string,
    input: StorePurchaseInput,
  ): Promise<boolean> {
    return true;
  }

  async purchase(
    appId: string,
    userId: string,
    input: StorePurchaseInput,
  ): Promise<StorePurchaseOutput> {
    const { products, address } = input;

    // check stocks
    this.checkStocks(appId, userId, input);

    // create order and associate products
    await this.storeOrderService.createOrder(appId, userId, products, address);

    return input;
  }
}
