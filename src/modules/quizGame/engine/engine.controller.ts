import {
  Controller,
  Get,
  Req,
  Query,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QuizzesEngineService } from './engine.service';
import {
  QuizEngineDoAnswerInput,
  QuizEngineDoAnswerOutput,
  QuizEngineGetQuizGameDataOutput,
} from './engine.types';
import { BaseHelper } from '../../framework/base';
import { JwtAuthGuardNoException } from '../../framework/auth';

@UseGuards(JwtAuthGuardNoException)
@ApiBearerAuth()
@Controller('api/quiz-game/engine')
@ApiTags('Engine - Quiz Game')
export class QuizzesEngineController {
  constructor(private readonly quizzesEngineService: QuizzesEngineService) {}

  @ApiOperation({
    summary: 'List of quiz game',
    operationId: 'listQuizGame',
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

    // console.log('getQuizGame', {
    //   authenticatedUserId,
    //   quizCode,
    //   user: req.user,
    // });

    return this.quizzesEngineService.getQuizGameData({
      quizCode,
      authenticatedUserId,
    });
  }

  @ApiOperation({
    summary: 'Answer specific question of quiz game',
    operationId: 'doAnswer',
  })
  @Post('/')
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

    // console.log('doAnswer', {
    //   authenticatedUserId,
    //   payload,
    //   user: req.user,
    // });

    return this.quizzesEngineService.doAnswer({
      ...payload,
      authenticatedUserId,
    });
  }
}
