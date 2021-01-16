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
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QuizzesUsersDataService } from './userData.service';
import { BaseController, IFieldsOrder } from '../../base';
import { QuizUserData } from './userData.entity';
import { DeleteResult } from 'typeorm';
import { Request } from 'express';

@Controller('api/quiz-game/users-data')
@ApiUseTags('Users Data - Quiz Game')
export class QuizzesUsersDataController extends BaseController<QuizUserData> {
  constructor(
    private readonly quizzesUsersDataService: QuizzesUsersDataService,
  ) {
    super(quizzesUsersDataService);
  }

  @ApiOperation({
    title: 'Get list of users data quiz game',
    operationId: 'listQuizUserData',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of users data quiz game',
    type: QuizUserData,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<QuizUserData[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    title: 'Get specific user data quiz game',
    operationId: 'getQuizUserData',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific user data quiz game',
    type: QuizUserData,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<QuizUserData> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    title: 'Add user data quiz game',
    operationId: 'addUserDataQuiz',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added user data quiz game',
    type: QuizUserData,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: QuizUserData,
  ): Promise<QuizUserData> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    title: 'Edit user data quiz game',
    operationId: 'editUserDataQuiz',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited user data quiz game',
    type: QuizUserData,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: QuizUserData,
  ): Promise<QuizUserData> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    title: 'Delete user data quiz game',
    operationId: 'deleteQuiz',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted user data quiz game',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
