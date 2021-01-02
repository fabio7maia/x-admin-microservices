import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuizEntity } from './quiz.entity';
import { BaseService } from '../base/base.service';
import { QuizzesQuestionsService } from '../quizzesQuestions';
import { QuizzesQuestionsAnswersService } from '../quizzesQuestionsAnswers';
import { QuizData } from './quiz.types';

@Injectable()
export class QuizzesService extends BaseService<QuizEntity> {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    private readonly quizzesQuestionsService: QuizzesQuestionsService,
    private readonly quizzesQuestionsAnswersService: QuizzesQuestionsAnswersService,
  ) {
    super(quizRepository);
  }

  async getQuiz(code: string) {
    const quiz = await this.quizRepository.findOne({ code });

    if (quiz !== undefined) {
      const quizData: QuizData = { ...quiz, questions: [] };
      const questions = await this.quizzesQuestionsService.getQuizQuestions(
        quiz.id,
      );

      (questions || []).forEach(async question => {
        const answers = await this.quizzesQuestionsAnswersService.getQuizQuestionsAnswers(
          question.id,
        );

        quizData.questions.push({
          ...question,
          answers,
        });
      });

      return quizData;
    }

    return null;
  }
}
