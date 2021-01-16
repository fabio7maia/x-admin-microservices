import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestionAnswer } from './questionAnswer.entity';
import { QuizzesQuestionsAnswersService } from './questionAnswer.service';
import { QuizzesQuestionsAnswersController } from './questionAnswer.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([QuizQuestionAnswer]),
  ],
  exports: [QuizzesQuestionsAnswersService],
  controllers: [QuizzesQuestionsAnswersController],
  providers: [QuizzesQuestionsAnswersService],
})
export class QuizzesQuestionsAnswersModule {}
