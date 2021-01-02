import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestionEntity } from './quizQuestion.entity';
import { QuizzesQuestionsService } from './quizQuestion.service';
import { QuizzesQuestionsController } from './quizQuestion.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([QuizQuestionEntity]),
  ],
  exports: [QuizzesQuestionsService],
  controllers: [QuizzesQuestionsController],
  providers: [QuizzesQuestionsService],
})
export class QuizzesQuestionsModule {}
