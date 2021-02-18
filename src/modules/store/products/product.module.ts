import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from './product.entity';
import { StoreProductService } from './product.service';
import { StoreProductController } from './product.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([StoreProduct]),
  ],
  exports: [StoreProductService],
  controllers: [StoreProductController],
  providers: [StoreProductService],
})
export class StoreProductsModule {}
