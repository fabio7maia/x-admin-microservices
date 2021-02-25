import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionsService } from './permission.service';
import { PermissionsController } from './permission.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Permission]),
  ],
  exports: [PermissionsService],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
