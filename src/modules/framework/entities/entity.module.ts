import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from './entity.entity';
import { EntitiesService } from './entity.service';
import { EntitiesController } from './entity.controller';
import { PassportModule } from '@nestjs/passport';
import { FieldsModule } from '../fields';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Entity]),
    FieldsModule,
  ],
  exports: [EntitiesService],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
