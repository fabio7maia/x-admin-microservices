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
import { QuizzesQuestionsService } from './quizQuestion.service';
import { BaseController } from '../base/base.controller';
import { QuizQuestionEntity } from './quizQuestion.entity';
import { DeleteResult } from 'typeorm';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/quizzes-questions')
@ApiUseTags('Quizzes Questions')
export class QuizzesQuestionsController extends BaseController<
  QuizQuestionEntity
> {
  constructor(
    private readonly quizzesQuestionsService: QuizzesQuestionsService,
  ) {
    super(quizzesQuestionsService);
  }

  @ApiOperation({
    title: 'List of quiz questions',
    operationId: 'listQuizQuestions',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of quiz questions',
    type: QuizQuestionEntity,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<QuizQuestionEntity[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    title: 'Get specific quiz question',
    operationId: 'getQuizQuestion',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific quiz question',
    type: QuizQuestionEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Param('id') id: string): Promise<QuizQuestionEntity> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    title: 'Add quiz question',
    operationId: 'addQuizQuestion',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added quiz question',
    type: QuizQuestionEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: QuizQuestionEntity,
  ): Promise<QuizQuestionEntity> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    title: 'Edit quiz question',
    operationId: 'editQuizQuestion',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited quiz question',
    type: QuizQuestionEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() payload: QuizQuestionEntity,
  ): Promise<QuizQuestionEntity> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    title: 'Delete quiz question',
    operationId: 'deleteQuizQuestion',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted quiz question',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
