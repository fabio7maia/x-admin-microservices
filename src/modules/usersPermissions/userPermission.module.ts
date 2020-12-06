import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './userPermission.entity';
import { UsersPermissionsService } from './userPermission.service';
import { UsersPermissionsController } from './userPermission.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserPermission]),
  ],
  exports: [UsersPermissionsService],
  controllers: [UsersPermissionsController],
  providers: [UsersPermissionsService],
})
export class UsersPermissionsModule {}
