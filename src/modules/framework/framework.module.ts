import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth';
import { CompaniesModule } from './companies';
import { ConfigurationsModule } from './configurations';
import { EntitiesModule } from './entities';
import { EntitiesRecordsModule } from './entitiesRecords';
import { FieldsModule } from './fields';
import { FunctionalitiesModule } from './functionalities';
import { MenusModule } from './menus';
import { ModesModule } from './modes';
import { PermissionsModule } from './permissions';
import { TranslationsModule } from './translations';
import { TypesModule } from './types';
import { UsersModule } from './users';
import { UsersCompaniesModule } from './usersCompanies';
import { UsersPermissionsModule } from './usersPermissions';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    CompaniesModule,
    ConfigurationsModule,
    EntitiesModule,
    EntitiesRecordsModule,
    FieldsModule,
    FunctionalitiesModule,
    MenusModule,
    ModesModule,
    PermissionsModule,
    TranslationsModule,
    TypesModule,
    UsersModule,
    UsersCompaniesModule,
    UsersPermissionsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class FrameworkModule {}
