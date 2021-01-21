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
  QuizEngineGetRandomQuestionsInput,
  QuizEngineGetRandomQuestionsOutput,
  QuizEngineDoAnswerOutput,
  QuizEngineDoAnswerServiceInput,
  QuizEngineCachedGameUserData,
} from './engine.types';

@Injectable()
export class QuizzesEngineService {
  constructor(
    private readonly quizzesQuestionsAnswersService: QuizzesQuestionsAnswersService,
    private readonly quizzesUsersDataService: QuizzesUsersDataService,
  ) {}

  private cachedGameUserData: Record<string, QuizEngineCachedGameUserData> = {};

  private getCachedUserData(userGameGuid): QuizEngineCachedGameUserData {
    return this.cachedGameUserData[userGameGuid];
  }

  private setCachedUserData(
    userGameGuid,
    gameUserData: QuizEngineCachedGameUserData,
  ): void {
    this.cachedGameUserData[userGameGuid] = gameUserData;
  }

  private async getRandomQuestions(
    input: QuizEngineGetRandomQuestionsInput,
  ): Promise<QuizEngineGetRandomQuestionsOutput> {
    const { quizCode } = input;

    const questionsResult = await getRepository(QuizQuestion)
      .createQueryBuilder('question')
      .innerJoinAndSelect(Quiz, 'quiz', 'quiz.id = question.quizId')
      .where('quiz.code = :quizCode', { quizCode })
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

    const questionsResult = await this.getRandomQuestions(input);

    this.setCachedUserData(userGameGuid, {
      ...gameData,
      currentQuestionId: questionsResult.question.id,
    });

    return {
      userGameGuid,
      question: questionsResult.question,
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
    const gameData = this.getCachedUserData(userGameGuid);

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

    const questionsResult = await this.getRandomQuestions(input);

    this.setCachedUserData(userGameGuid, {
      ...gameData,
      currentQuestionId: questionsResult.question.id,
    });

    // console.log('doAnswers', {
    //   userGameGuid,
    //   question: questionsResult.question,
    //   gameData: {
    //     answers: gameData.answers,
    //     correctAnswers: gameData.correctAnswers,
    //     points: gameData.points,
    //   },
    //   isCorrectAnswer: answerResult?.correctAnswer,
    // });

    return {
      userGameGuid,
      question: questionsResult.question,
      gameData: {
        answers: gameData.answers,
        correctAnswers: gameData.correctAnswers,
        points: gameData.points,
      },
      isCorrectAnswer: answerResult?.correctAnswer,
    };
  }
}
