import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Functionality } from './functionality.entity';
import { FunctionalitiesService } from './functionality.service';
import { FunctionalitiesController } from './functionality.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Functionality]),
  ],
  exports: [FunctionalitiesService],
  controllers: [FunctionalitiesController],
  providers: [FunctionalitiesService],
})
export class FunctionalitiesModule {}
