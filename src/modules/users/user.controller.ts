import {
  Controller,
  UseGuards,
  Get,
  Post,
  Req,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService, User } from './';
import { BaseController } from '../base/base.controller';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/users')
@ApiTags('Users')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get list of users',
    operationId: 'listUsers',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of users',
    type: User,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<User[]> {
    return super.getListOfRecords(req, order);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get specific user',
    operationId: 'getUser',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific user',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<User> {
    return super.getRecordById(id);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Add new user',
    operationId: 'addUser',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful added user',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: User): Promise<User> {
    return super.createRecord(req, payload);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Edit existing user',
    operationId: 'editUser',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful edited user',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: User,
  ): Promise<User> {
    return super.updateRecord(req, id, payload);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete user',
    operationId: 'deleteUser',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful deleted user',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
