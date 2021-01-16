import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './question.entity';
import { QuizzesQuestionsService } from './question.service';
import { QuizzesQuestionsController } from './question.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([QuizQuestion]),
  ],
  exports: [QuizzesQuestionsService],
  controllers: [QuizzesQuestionsController],
  providers: [QuizzesQuestionsService],
})
export class QuizzesQuestionsModule {}
