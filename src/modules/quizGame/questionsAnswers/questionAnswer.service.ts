import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base';
import { QuizQuestionAnswer } from './questionAnswer.entity';

@Injectable()
export class QuizzesQuestionsAnswersService extends BaseService<
  QuizQuestionAnswer
> {
  constructor(
    @InjectRepository(QuizQuestionAnswer)
    private readonly quizQuestionAnswerRepository: Repository<
      QuizQuestionAnswer
    >,
  ) {
    super(quizQuestionAnswerRepository);
  }

  async getQuizQuestionsAnswers(quizQuestionId: string) {
    return this.quizQuestionAnswerRepository.find({ quizQuestionId });
  }
}
