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
  Param,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QuizzesQuestionsAnswersService } from './quizQuestionAnswer.service';
import { BaseController } from '../base/base.controller';
import { QuizQuestionAnswerEntity } from './quizQuestionAnswer.entity';
import { DeleteResult } from 'typeorm';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/quizzes-questions-answers')
@ApiUseTags('Quizzes Questions Answers')
export class QuizzesQuestionsAnswersController extends BaseController<
  QuizQuestionAnswerEntity
> {
  constructor(
    private readonly quizzesQuestionsAnswersService: QuizzesQuestionsAnswersService,
  ) {
    super(quizzesQuestionsAnswersService);
  }

  @ApiOperation({
    title: 'List of quiz question answers',
    operationId: 'listQuizQuestionAnswers',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of answers of quiz question',
    type: QuizQuestionAnswerEntity,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<QuizQuestionAnswerEntity[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    title: 'Get specific quiz question answers',
    operationId: 'getQuizQuestionAnswer',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific answer of quiz question',
    type: QuizQuestionAnswerEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Param('id') id: string): Promise<QuizQuestionAnswerEntity> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    title: 'Add quiz question answers',
    operationId: 'addQuizQuestionAnswer',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added answer of quiz question',
    type: QuizQuestionAnswerEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: QuizQuestionAnswerEntity,
  ): Promise<QuizQuestionAnswerEntity> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    title: 'Edit quiz question answers',
    operationId: 'editQuizQuestionAnswer',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited answer of quiz question',
    type: QuizQuestionAnswerEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() payload: QuizQuestionAnswerEntity,
  ): Promise<QuizQuestionAnswerEntity> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    title: 'Delete quiz question answers',
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
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
