import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuizQuestion } from './quizQuestion.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class QuizzesQuestionsService extends BaseService<QuizQuestion> {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>,
  ) {
    super(quizQuestionRepository);
  }

  async getQuizQuestions(quizId: string) {
    return this.quizQuestionRepository.find({ quizId });
  }
}
