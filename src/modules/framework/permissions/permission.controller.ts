import {
  Controller,
  UseGuards,
  Get,
  Req,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PermissionsService } from './';
import { BaseController } from '../../base/base.controller';
import { Permission } from './permission.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/permissions')
@ApiTags('Permissions')
export class PermissionsController extends BaseController<Permission> {
  constructor(private readonly permissionsService: PermissionsService) {
    super(permissionsService);
  }

  @ApiOperation({
    summary: 'List of permissions',
    operationId: 'getPermissions',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of permissions',
    type: Permission,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Permission[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific permission',
    operationId: 'getPermission',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific permission',
    type: Permission,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Permission> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add permission',
    operationId: 'addPermission',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added permission',
    type: Permission,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Permission): Promise<Permission> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit permission',
    operationId: 'editPermission',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited permission',
    type: Permission,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Permission,
  ): Promise<Permission> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete permission',
    operationId: 'deletePermission',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted permission',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
