import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizUserData } from './userData.entity';
import { QuizzesUsersDataService } from './userData.service';
import { QuizzesUsersDataController } from './userData.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([QuizUserData]),
  ],
  exports: [QuizzesUsersDataService],
  controllers: [QuizzesUsersDataController],
  providers: [QuizzesUsersDataService],
})
export class QuizzesUsersDataModule {}
