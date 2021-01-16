import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizUserData } from './userData.entity';
import { BaseService } from '../../base';

@Injectable()
export class QuizzesUsersDataService extends BaseService<QuizUserData> {
  constructor(
    @InjectRepository(QuizUserData)
    private readonly quizUserDataRepository: Repository<QuizUserData>,
  ) {
    super(quizUserDataRepository);
  }

  async getUserDataByUserId(userId: string) {
    return this.quizUserDataRepository.findOne({ userId });
  }
}
