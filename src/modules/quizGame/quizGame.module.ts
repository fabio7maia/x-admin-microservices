import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { QuizzesEngineModule } from './engine';
import { QuizzesQuestionsModule } from './questions';
import { QuizzesQuestionsAnswersModule } from './questionsAnswers';
import { QuizzesModule } from './quizzes';
import { QuizzesUsersDataModule } from './usersData';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    QuizzesEngineModule,
    QuizzesQuestionsModule,
    QuizzesQuestionsAnswersModule,
    QuizzesModule,
    QuizzesUsersDataModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class QuizGameModule {}
