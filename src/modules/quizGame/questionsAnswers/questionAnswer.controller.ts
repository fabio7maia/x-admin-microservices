import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Put,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QuizzesQuestionsAnswersService } from './questionAnswer.service';
import { BaseController, IFieldsOrder } from '../../base';
import { QuizQuestionAnswer } from './questionAnswer.entity';
import { DeleteResult } from 'typeorm';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/quiz-game/questions-answers')
@ApiTags('Questions Answers - Quiz Game')
export class QuizzesQuestionsAnswersController extends BaseController<
  QuizQuestionAnswer
> {
  constructor(
    private readonly quizzesQuestionsAnswersService: QuizzesQuestionsAnswersService,
  ) {
    super(quizzesQuestionsAnswersService);
  }

  @ApiOperation({
    summary: 'List of quiz question answers',
    operationId: 'listQuizQuestionAnswers',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of answers of quiz question',
    type: QuizQuestionAnswer,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<QuizQuestionAnswer[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific quiz question answers',
    operationId: 'getQuizQuestionAnswer',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific answer of quiz question',
    type: QuizQuestionAnswer,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<QuizQuestionAnswer> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add quiz question answers',
    operationId: 'addQuizQuestionAnswer',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added answer of quiz question',
    type: QuizQuestionAnswer,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: QuizQuestionAnswer,
  ): Promise<QuizQuestionAnswer> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit quiz question answers',
    operationId: 'editQuizQuestionAnswer',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited answer of quiz question',
    type: QuizQuestionAnswer,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: QuizQuestionAnswer,
  ): Promise<QuizQuestionAnswer> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete quiz question answers',
    operationId: 'deleteQuizQuestionAnswer',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted answer of quiz question',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
