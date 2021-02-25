import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StoreCategoriesModule } from './categories';
import { StoreClientsModule } from './clients';
import { StoreOrdersModule } from './orders';
import { StoreProductsModule } from './products';
import { StorePurchasesModule } from './purchases';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    StoreCategoriesModule,
    StoreClientsModule,
    StoreOrdersModule,
    StoreProductsModule,
    StorePurchasesModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class StoreModule {}
