import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestionAnswerEntity } from './quizQuestionAnswer.entity';
import { QuizzesQuestionsAnswersService } from './quizQuestionAnswer.service';
import { QuizzesQuestionsAnswersController } from './quizQuestionAnswer.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([QuizQuestionAnswerEntity]),
  ],
  exports: [QuizzesQuestionsAnswersService],
  controllers: [QuizzesQuestionsAnswersController],
  providers: [QuizzesQuestionsAnswersService],
})
export class QuizzesQuestionsAnswersModule {}
