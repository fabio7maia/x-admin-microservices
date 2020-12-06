import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompaniesService } from './company.service';
import { CompaniesController } from './company.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Company]),
  ],
  exports: [CompaniesService],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
