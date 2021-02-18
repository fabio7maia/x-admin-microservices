import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CompaniesModule } from './companies';
import { ConfigurationsModule } from './configurations';
import { EntitiesModule } from './entities';
import { EntitiesRecordsModule } from './entitiesRecords';
import { FieldsModule } from './fields';
import { FunctionalitiesModule } from './functionalities';
import { ModesModule } from './modes';
import { PermissionsModule } from './permissions';
import { TypesModule } from './types';
import { UsersCompaniesModule } from './usersCompanies';
import { UsersPermissionsModule } from './usersPermissions';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CompaniesModule,
    ConfigurationsModule,
    EntitiesModule,
    EntitiesRecordsModule,
    FieldsModule,
    FunctionalitiesModule,
    ModesModule,
    PermissionsModule,
    TypesModule,
    UsersCompaniesModule,
    UsersPermissionsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class FrameworkModule {}
