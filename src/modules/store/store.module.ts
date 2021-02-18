import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StoreAppsModule } from './apps';
import { StoreCategoriesModule } from './categories';
import { StoreClientsModule } from './clients';
import { StoreOrdersModule } from './orders';
import { StoreProductsModule } from './products';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    StoreAppsModule,
    StoreCategoriesModule,
    StoreClientsModule,
    StoreOrdersModule,
    StoreProductsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class StoreModule {}
