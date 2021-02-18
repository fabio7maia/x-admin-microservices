import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mode } from './mode.entity';
import { ModesService } from './mode.service';
import { ModesController } from './mode.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Mode]),
  ],
  exports: [ModesService],
  controllers: [ModesController],
  providers: [ModesService],
})
export class ModesModule {}
