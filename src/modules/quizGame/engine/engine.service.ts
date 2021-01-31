import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseHelper } from '../../base';
import { getRepository } from 'typeorm';
import { QuizQuestion } from '../questions';
import {
  QuizQuestionAnswer,
  QuizzesQuestionsAnswersService,
} from '../questionsAnswers';
import { Quiz } from '../quizzes';
import { QuizzesUsersDataService } from '../usersData';
import {
  QuizEngineGetQuizGameDataInput,
  QuizEngineGetQuizGameDataOutput,
  QuizEngineGetRandomQuestionInput,
  QuizEngineGetRandomQuestionOutput,
  QuizEngineDoAnswerOutput,
  QuizEngineDoAnswerServiceInput,
  QuizEngineCachedGameUserData,
  QuizEngineSetOnlineUserData,
} from './engine.types';
import { RedisCacheService } from '../../redisCache';

@Injectable()
export class QuizzesEngineService {
  constructor(
    private readonly quizzesQuestionsAnswersService: QuizzesQuestionsAnswersService,
    private readonly quizzesUsersDataService: QuizzesUsersDataService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  private getCachedUserData = (
    userGameGuid,
  ): Promise<QuizEngineCachedGameUserData> => {
    return this.redisCacheService.get(userGameGuid);
  };

  private setCachedUserData = (
    userGameGuid,
    gameUserData: QuizEngineCachedGameUserData,
  ): void => {
    this.redisCacheService.set(userGameGuid, gameUserData);
  };

  private async getRandomQuestion(
    input: QuizEngineGetRandomQuestionInput,
  ): Promise<QuizEngineGetRandomQuestionOutput> {
    const { quizCode, lastQuestionId } = input;

    // TODO: save in cache
    const questionsResult = await getRepository(QuizQuestion)
      .createQueryBuilder('question')
      .innerJoinAndSelect(Quiz, 'quiz', 'quiz.id = question.quizId')
      .where('quiz.code = :quizCode and question.id != :questionId', {
        quizCode,
        questionId: lastQuestionId || '',
      })
      .getMany();

    if (questionsResult.length === 0) {
      throw new NotFoundException('Questions not found');
    }

    const randomQuestionIndex = Math.floor(
      Math.random() * questionsResult.length,
    );

    const question = questionsResult[randomQuestionIndex];

    const answers = await this.quizzesQuestionsAnswersService.getQuizQuestionsAnswers(
      question.id,
    );

    return {
      question: {
        id: question.id,
        answers: answers.map(x => ({
          answer: x.answer,
          id: x.id,
        })),
        question: question.question,
      },
    };
  }

  async getQuizGameData(
    input: QuizEngineGetQuizGameDataInput,
  ): Promise<QuizEngineGetQuizGameDataOutput> {
    const { authenticatedUserId } = input;
    let userGameGuid = BaseHelper.getGuid();

    const isAuthenticatedUser = authenticatedUserId !== '__system__';

    const userData = isAuthenticatedUser
      ? await this.quizzesUsersDataService.getUserDataByUserId(
          authenticatedUserId,
        )
      : undefined;
    const gameData = { answers: 0, correctAnswers: 0, points: 0 };

    if (userData) {
      gameData.answers = userData.answers;
      gameData.correctAnswers = userData.correctAnswers;
      gameData.points = userData.points;
    } else if (isAuthenticatedUser) {
      await this.quizzesUsersDataService.create(authenticatedUserId, {
        userId: authenticatedUserId,
        answers: 0,
        correctAnswers: 0,
        points: 0,
      });
    }

    // console.log('getQuizGameData', {
    //   gameData,
    //   userData,
    //   isAuthenticatedUser,
    // });

    const questionResult = await this.getRandomQuestion(input);

    this.setCachedUserData(userGameGuid, {
      ...gameData,
      currentQuestionId: questionResult.question.id,
    });

    return {
      userGameGuid,
      question: questionResult.question,
      gameData: {
        answers: gameData.answers,
        correctAnswers: gameData.correctAnswers,
        points: gameData.points,
      },
    };
  }

  async doAnswer(
    input: QuizEngineDoAnswerServiceInput,
  ): Promise<QuizEngineDoAnswerOutput> {
    const {
      authenticatedUserId,
      userGameGuid,
      quizCode,
      answerId,
      questionId,
    } = input;

    const isAuthenticatedUser = authenticatedUserId !== '__system__';

    const userData = isAuthenticatedUser
      ? await this.quizzesUsersDataService.getUserDataByUserId(
          authenticatedUserId,
        )
      : undefined;
    const gameData = await this.getCachedUserData(userGameGuid);

    if (!gameData || gameData.currentQuestionId !== questionId) {
      throw new InternalServerErrorException('Invalid game state');
    }

    const answerResult = await getRepository(QuizQuestionAnswer)
      .createQueryBuilder('answer')
      .innerJoinAndSelect(
        QuizQuestion,
        'question',
        'question.id = answer.quizQuestionId',
      )
      .innerJoinAndSelect(Quiz, 'quiz', 'quiz.id = question.quizId')
      .where(
        'answer.id = :answerId and question.id = :questionId and quiz.code = :quizCode',
        { answerId, questionId, quizCode },
      )
      .getOne();

    if (userData) {
      gameData.answers = userData.answers;
      gameData.correctAnswers = userData.correctAnswers;
      gameData.points = userData.points;
    }

    // console.log('doAnswers', {
    //   answerResult,
    //   gameData,
    //   userData,
    //   isAuthenticatedUser,
    // });

    gameData.answers++;
    if (answerResult?.correctAnswer) {
      gameData.correctAnswers++;
      gameData.points++;
    }

    if (userData) {
      this.quizzesUsersDataService.update(authenticatedUserId, userData.id, {
        ...userData,
        ...gameData,
      });
    }

    const questionResult = await this.getRandomQuestion({
      ...input,
      lastQuestionId: questionId,
    });

    this.setCachedUserData(userGameGuid, {
      ...gameData,
      currentQuestionId: questionResult.question.id,
    });

    // console.log('doAnswers', {
    //   userGameGuid,
    //   question: questionResult.question,
    //   gameData: {
    //     answers: gameData.answers,
    //     correctAnswers: gameData.correctAnswers,
    //     points: gameData.points,
    //   },
    //   isCorrectAnswer: answerResult?.correctAnswer,
    // });

    return {
      userGameGuid,
      question: questionResult.question,
      gameData: {
        answers: gameData.answers,
        correctAnswers: gameData.correctAnswers,
        points: gameData.points,
      },
      isCorrectAnswer: answerResult?.correctAnswer,
    };
  }

  getOnlineUsersData = async (): Promise<
    Record<string, QuizEngineSetOnlineUserData>
  > => {
    return (await this.redisCacheService.get('onlineUsers')) || {};
  };

  setOnlineUserData = async (
    user: QuizEngineSetOnlineUserData,
  ): Promise<void> => {
    const onlineUsers = await this.getOnlineUsersData();

    console.log('setOnlineUsersData', { onlineUsers });

    onlineUsers[user.id] = user;

    this.redisCacheService.set('onlineUsers', onlineUsers, { ttl: 60 });
  };
}
