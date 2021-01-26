import { Module } from '@nestjs/common';
import { QuizzesEngineService } from './engine.service';
import { QuizzesEngineController } from './engine.controller';
import { PassportModule } from '@nestjs/passport';
import { QuizzesQuestionsAnswersModule } from '../questionsAnswers';
import { QuizzesUsersDataModule } from '../usersData';
import { RedisCacheModule } from '../../redisCache';
import { QuizzesEngineGateway } from './engine.gateway';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RedisCacheModule,
    QuizzesQuestionsAnswersModule,
    QuizzesUsersDataModule,
  ],
  exports: [QuizzesEngineService],
  controllers: [QuizzesEngineController],
  providers: [QuizzesEngineService, QuizzesEngineGateway],
})
export class QuizzesEngineModule {}
