import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Req,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiUseTags,
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
@ApiUseTags('Users')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Get('/')
  @ApiOperation({
    title: 'Get list of users',
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
    title: 'Get specific user by id',
    operationId: 'getUserById',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific user',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Param('id') id: string): Promise<User> {
    return super.getRecordById(id);
  }

  @Post('/')
  @ApiOperation({
    title: 'Add new user',
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
    title: 'Update user',
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
    @Param('id') id: string,
    @Body() payload: User,
  ): Promise<User> {
    return super.updateRecord(req, id, payload);
  }

  @Delete('/:id')
  @ApiOperation({
    title: 'Delete user',
    operationId: 'deleteUser',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful deleted user',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
