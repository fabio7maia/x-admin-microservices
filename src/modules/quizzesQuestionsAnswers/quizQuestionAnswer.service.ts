import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuizQuestionAnswerEntity } from './quizQuestionAnswer.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class QuizzesQuestionsAnswersService extends BaseService<
  QuizQuestionAnswerEntity
> {
  constructor(
    @InjectRepository(QuizQuestionAnswerEntity)
    private readonly quizQuestionAnswerRepository: Repository<
      QuizQuestionAnswerEntity
    >,
  ) {
    super(quizQuestionAnswerRepository);
  }

  async getQuizQuestionsAnswers(quizQuestionId: string) {
    return this.quizQuestionAnswerRepository.find({ quizQuestionId });
  }
}
