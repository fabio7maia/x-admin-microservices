import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreOrder, StoreOrderProduct } from './order.entity';
import { StoreOrderService } from './order.service';
import { StoreOrderController } from './order.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([StoreOrder, StoreOrderProduct]),
  ],
  exports: [StoreOrderService],
  controllers: [StoreOrderController],
  providers: [StoreOrderService],
})
export class StoreOrdersModule {}
