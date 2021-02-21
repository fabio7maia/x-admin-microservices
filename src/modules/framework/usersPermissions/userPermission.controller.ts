import {
  Controller,
  UseGuards,
  Get,
  Req,
  Body,
  Post,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UsersPermissionsService } from './';
import { BaseController } from '../base/base.controller';
import { UserPermission } from './userPermission.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/users-permissions')
@ApiTags('Users Permissions')
export class UsersPermissionsController extends BaseController<UserPermission> {
  constructor(
    private readonly usersPermissionsService: UsersPermissionsService,
  ) {
    super(usersPermissionsService);
  }

  @ApiOperation({
    summary: 'List of user permissions',
    operationId: 'listUserPermissions',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of user permissions',
    type: UserPermission,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<UserPermission[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific user permission',
    operationId: 'getUserPermission',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific user permission',
    type: UserPermission,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<UserPermission> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add user permission',
    operationId: 'addUserPermission',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added user permission',
    type: UserPermission,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: UserPermission,
  ): Promise<UserPermission> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit user permission',
    operationId: 'editUserPermission',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited user permission',
    type: UserPermission,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: UserPermission,
  ): Promise<UserPermission> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete user permission',
    operationId: 'deleteUserPermission',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted user permission',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
