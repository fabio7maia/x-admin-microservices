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
import { QuizzesService } from './quiz.service';
import { BaseController } from '../base/base.controller';
import { Quiz } from './quiz.entity';
import { DeleteResult } from 'typeorm';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { QuizData } from './quiz.types';

@Controller('api/quizzes')
@ApiUseTags('Quizzes')
export class QuizzesController extends BaseController<Quiz> {
  constructor(private readonly quizzesService: QuizzesService) {
    super(quizzesService);
  }

  @ApiOperation({
    title: 'Get list of quizzes',
    operationId: 'listQuizzes',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of quizzes',
    type: Quiz,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Quiz[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    title: 'Get specific quiz',
    operationId: 'getQuiz',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific quiz',
    type: Quiz,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Param('id') id: string): Promise<Quiz> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    title: 'Get specific quiz by code',
    operationId: 'getQuizByCode',
  })
  @Get('/code/:code')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific quiz by code',
    type: QuizData,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getByCode(@Param('code') code: string): Promise<QuizData> {
    return this.quizzesService.getQuiz(code);
  }

  @ApiOperation({
    title: 'Add quiz',
    operationId: 'addQuiz',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
    title: 'Edit quiz',
    operationId: 'editQuiz',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
    @Param('id') id: string,
    @Body() payload: Quiz,
  ): Promise<Quiz> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    title: 'Delete quiz',
    operationId: 'deleteQuiz',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted quiz',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
