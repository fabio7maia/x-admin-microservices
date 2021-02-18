import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreApp } from './app.entity';
import { StoreAppService } from './app.service';
import { StoreAppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([StoreApp]),
  ],
  exports: [StoreAppService],
  controllers: [StoreAppController],
  providers: [StoreAppService],
})
export class StoreAppsModule {}
