import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translation } from './translation.entity';
import { TranslationsController } from './translation.controller';
import { TranslationService } from './translation.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Translation]),
  ],
  providers: [TranslationService],
  exports: [TranslationService],
  controllers: [TranslationsController],
})
export class TranslationsModule {}
