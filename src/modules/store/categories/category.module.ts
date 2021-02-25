import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreCategory } from './category.entity';
import { StoreCategoryService } from './category.service';
import { StoreCategoryController } from './category.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([StoreCategory]),
  ],
  exports: [StoreCategoryService],
  controllers: [StoreCategoryController],
  providers: [StoreCategoryService],
})
export class StoreCategoriesModule {}
