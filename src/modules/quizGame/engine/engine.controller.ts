import { Controller, Get, Req, Query, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { QuizzesEngineService } from './engine.service';
import {
  QuizEngineDoAnswerInput,
  QuizEngineDoAnswerOutput,
  QuizEngineGetQuizGameDataOutput,
} from './engine.types';
import { BaseHelper } from '../../base';

@Controller('api/quiz-game/engine')
@ApiUseTags('Engine - Quiz Game')
export class QuizzesEngineController {
  constructor(private readonly quizzesEngineService: QuizzesEngineService) {}

  @ApiOperation({
    title: 'Get data of quiz game',
    operationId: 'getQuizGame',
  })
  @Get('/:quizCode?')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained data of quiz game',
    type: QuizEngineGetQuizGameDataOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getQuizGame(
    @Req() req,
    @Query('quizCode') quizCode?: string,
  ): Promise<QuizEngineGetQuizGameDataOutput> {
    const authenticatedUserId = BaseHelper.getCurrentUserId(req);

    // console.log('getQuizGame', { authenticatedUserId, quizCode });

    return this.quizzesEngineService.getQuizGameData({
      quizCode,
      authenticatedUserId,
    });
  }

  @ApiOperation({
    title: 'Answer specific question of quiz game',
    operationId: 'doAnswer',
  })
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Successful answer specific question of quiz game',
    type: QuizEngineDoAnswerOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async doAnswer(
    @Req() req,
    @Body() payload: QuizEngineDoAnswerInput,
  ): Promise<QuizEngineDoAnswerOutput> {
    const authenticatedUserId = BaseHelper.getCurrentUserId(req);

    // console.log('doAnswer', { ...payload, authenticatedUserId });

    return this.quizzesEngineService.doAnswer({
      ...payload,
      authenticatedUserId,
    });
  }
}
