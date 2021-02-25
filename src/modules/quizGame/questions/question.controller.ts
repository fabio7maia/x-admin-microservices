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
import { QuizzesQuestionsService } from './question.service';
import { BaseController, IFieldsOrder } from '../../framework/base';
import { QuizQuestion } from './question.entity';
import { DeleteResult } from 'typeorm';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/quiz-game/questions')
@ApiTags('Questions - Quiz Game')
export class QuizzesQuestionsController extends BaseController<QuizQuestion> {
  constructor(
    private readonly quizzesQuestionsService: QuizzesQuestionsService,
  ) {
    super(quizzesQuestionsService);
  }

  @ApiOperation({
    summary: 'List of quiz questions',
    operationId: 'listQuizQuestions',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of quiz questions',
    type: QuizQuestion,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<QuizQuestion[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific quiz question',
    operationId: 'getQuizQuestion',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific quiz question',
    type: QuizQuestion,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<QuizQuestion> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add quiz question',
    operationId: 'addQuizQuestion',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added quiz question',
    type: QuizQuestion,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: QuizQuestion,
  ): Promise<QuizQuestion> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit quiz question',
    operationId: 'editQuizQuestion',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited quiz question',
    type: QuizQuestion,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: QuizQuestion,
  ): Promise<QuizQuestion> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete quiz question',
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
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
