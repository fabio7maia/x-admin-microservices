import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuizQuestionEntity } from './quizQuestion.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class QuizzesQuestionsService extends BaseService<QuizQuestionEntity> {
  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepository: Repository<QuizQuestionEntity>,
  ) {
    super(quizQuestionRepository);
  }

  async getQuizQuestions(quizId: string) {
    return this.quizQuestionRepository.find({ quizId });
  }
}
