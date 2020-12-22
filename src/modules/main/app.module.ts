import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ConfigurationsModule,
  ConfigurationsService,
} from './../configurations';
import { AuthModule } from './../auth';
import { NewsModule } from '../news';
import { MenusModule } from '../menus';
import { CompaniesModule } from '../companies';
import { FunctionalitiesModule } from '../functionalities';
import { PermissionsModule } from '../permissions';
import { UsersCompaniesModule } from '../usersCompanies';
import { UsersPermissionsModule } from '../usersPermissions';
import { EntitiesModule } from '../entities';
import { TypesModule } from '../types';
import { ModesModule } from '../modes';
import { FieldsModule } from '../fields';
import { EntitiesRecordsModule } from '../entitiesRecords';
import { UsersModule } from '../users';
import { TranslationsModule } from '../translations';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationsModule],
      inject: [ConfigurationsService],
      useFactory: (configService: ConfigurationsService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.isEnv('dev'),
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigurationsModule,
    AuthModule,
    NewsModule,
    MenusModule,
    CompaniesModule,
    FunctionalitiesModule,
    PermissionsModule,
    UsersCompaniesModule,
    UsersPermissionsModule,
    EntitiesModule,
    TypesModule,
    ModesModule,
    FieldsModule,
    EntitiesRecordsModule,
    UsersModule,
    TranslationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
