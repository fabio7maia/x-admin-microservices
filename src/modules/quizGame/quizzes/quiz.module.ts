import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuizzesService } from './quiz.service';
import { QuizzesController } from './quiz.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Quiz]),
  ],
  exports: [QuizzesService],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
