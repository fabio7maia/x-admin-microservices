import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationsService } from './configuration.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './configuration.entity';
import { ConfigurationsController } from './configuration.controller';
import { ConfigurationsDbService } from './configuration-db.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Configuration]),
    ConfigModule,
  ],
  providers: [
    {
      provide: ConfigurationsService,
      useValue: new ConfigurationsService('.env'),
    },
    ConfigurationsDbService,
  ],
  exports: [ConfigurationsService, ConfigurationsDbService],
  controllers: [ConfigurationsController],
})
export class ConfigurationsModule {}
