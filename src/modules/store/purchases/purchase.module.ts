import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StorePurchaseService } from './purchase.service';
import { StorePurchaseController } from './purchase.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [StorePurchaseService],
  controllers: [StorePurchaseController],
  providers: [StorePurchaseService],
})
export class StorePurchasesModule {}
