import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityRecord } from './entityRecord.entity';
import { EntitiesRecordsService } from './entityRecord.service';
import { EntitiesRecordsController } from './entityRecord.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([EntityRecord]),
  ],
  exports: [EntitiesRecordsService],
  controllers: [EntitiesRecordsController],
  providers: [EntitiesRecordsService],
})
export class EntitiesRecordsModule {}
