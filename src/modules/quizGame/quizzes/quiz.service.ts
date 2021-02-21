import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Quiz } from './quiz.entity';
import { BaseService } from '../../framework/base';

@Injectable()
export class QuizzesService extends BaseService<Quiz> {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {
    super(quizRepository);
  }
}
