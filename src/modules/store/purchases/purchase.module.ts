import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StorePurchaseService } from './purchase.service';
import { StorePurchaseController } from './purchase.controller';
import { StoreOrdersModule } from '../orders';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    StoreOrdersModule,
  ],
  exports: [StorePurchaseService],
  controllers: [StorePurchaseController],
  providers: [StorePurchaseService],
})
export class StorePurchasesModule {}
