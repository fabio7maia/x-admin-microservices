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
import { QuizzesService } from './quiz.service';
import { BaseController, IFieldsOrder } from '../../framework/base';
import { Quiz } from './quiz.entity';
import { DeleteResult } from 'typeorm';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/quiz-game/quizzes')
@ApiTags('Quizzes - Quiz Game')
export class QuizzesController extends BaseController<Quiz> {
  constructor(private readonly quizzesService: QuizzesService) {
    super(quizzesService);
  }

  @ApiOperation({
    summary: 'List of quizzes',
    operationId: 'listQuizzes',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of quizzes',
    type: Quiz,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req, order?: IFieldsOrder): Promise<Quiz[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific quiz',
    operationId: 'getQuiz',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific quiz',
    type: Quiz,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Quiz> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add quiz',
    operationId: 'addQuiz',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added quiz',
    type: Quiz,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Quiz): Promise<Quiz> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit quiz',
    operationId: 'editQuiz',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited quiz',
    type: Quiz,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Quiz,
  ): Promise<Quiz> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete quiz',
    operationId: 'deleteQuiz',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted quiz',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
