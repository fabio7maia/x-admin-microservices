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
import { UsersCompaniesService } from './';
import { BaseController } from '../base/base.controller';
import { UserCompany } from './userCompany.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/users-companies')
@ApiTags('Users Companies')
export class UsersCompaniesController extends BaseController<UserCompany> {
  constructor(private readonly usersCompaniesService: UsersCompaniesService) {
    super(usersCompaniesService);
  }

  @ApiOperation({
    summary: 'List of user companies',
    operationId: 'listUserCompanies',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of user companies',
    type: UserCompany,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<UserCompany[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific user company',
    operationId: 'getUserCompany',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific user company',
    type: UserCompany,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<UserCompany> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add user company',
    operationId: 'addUserCompany',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added user company',
    type: UserCompany,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: UserCompany): Promise<UserCompany> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit user company',
    operationId: 'editUserCompany',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited user company',
    type: UserCompany,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: UserCompany,
  ): Promise<UserCompany> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete user company',
    operationId: 'deleteUserCompany',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted user company',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
