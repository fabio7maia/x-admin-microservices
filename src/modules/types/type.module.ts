import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { TypesService } from './type.service';
import { TypesController } from './type.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Type]),
  ],
  exports: [TypesService],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
