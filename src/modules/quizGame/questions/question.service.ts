import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../framework/base';
import { QuizQuestion } from './question.entity';

@Injectable()
export class QuizzesQuestionsService extends BaseService<QuizQuestion> {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>,
  ) {
    super(quizQuestionRepository);
  }
}
