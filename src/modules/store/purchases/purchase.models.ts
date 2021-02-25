import { ApiProperty } from '@nestjs/swagger';
import { StoreProduct } from '../products';

export class StorePurchaseInput {
  @ApiProperty()
  products: StoreProduct[];

  @ApiProperty()
  address: string;
}

export class StorePurchaseOutput {
  @ApiProperty()
  products: StoreProduct[];

  @ApiProperty()
  address: string;
}
