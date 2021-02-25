import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompany } from './userCompany.entity';
import { UsersCompaniesService } from './userCompany.service';
import { UsersCompaniesController } from './userCompany.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserCompany]),
  ],
  exports: [UsersCompaniesService],
  controllers: [UsersCompaniesController],
  providers: [UsersCompaniesService],
})
export class UsersCompaniesModule {}
