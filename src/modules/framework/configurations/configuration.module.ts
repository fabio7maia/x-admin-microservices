import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './configuration.entity';
import { ConfigurationsController } from './configuration.controller';
import { ConfigurationsService } from './configuration.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Configuration]),
    ConfigModule,
  ],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService, ConfigurationsService],
  controllers: [ConfigurationsController],
})
export class ConfigurationsModule {}
