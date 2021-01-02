import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuizzesService } from './quiz.service';
import { QuizzesController } from './quiz.controller';
import { PassportModule } from '@nestjs/passport';
import { QuizzesQuestionsModule } from '../quizzesQuestions';
import { QuizzesQuestionsAnswersModule } from '../quizzesQuestionsAnswers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Quiz]),
    QuizzesQuestionsModule,
    QuizzesQuestionsAnswersModule,
  ],
  exports: [QuizzesService],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
