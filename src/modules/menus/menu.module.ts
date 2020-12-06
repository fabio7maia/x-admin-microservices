import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenusService } from './menu.service';
import { MenusController } from './menu.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Menu]),
  ],
  exports: [MenusService],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
