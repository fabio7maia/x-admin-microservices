import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './field.entity';
import { FieldsService } from './field.service';
import { FieldsController } from './field.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Field]),
  ],
  exports: [FieldsService],
  controllers: [FieldsController],
  providers: [FieldsService],
})
export class FieldsModule {}
