import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './../configurations';
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
import { QuizGameModule } from '../quizGame';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DATABASE_TYPE'),
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get('APP_ENV') === 'dev',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot(),
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
    QuizGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
