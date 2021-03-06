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
import { CompaniesService } from './';
import { BaseController } from '../base/base.controller';
import { Company } from './company.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../base/models/filter.model';
import { DeleteResult } from 'typeorm';
import { BaseHelper } from '../base';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/companies')
@ApiTags('Companies')
export class CompaniesController extends BaseController<Company> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService);
  }

  @ApiOperation({
    summary: 'List of companies',
    operationId: 'listCompanies',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of companies',
    type: Company,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req, order?: IFieldsOrder): Promise<Company[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'List of companies by user',
    operationId: 'listCompaniesByUser',
  })
  @Get('/user')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of companies by user',
    type: Company,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listByUser(@Req() req, order?: IFieldsOrder): Promise<Company[]> {
    const userId = BaseHelper.getCurrentUserId(req);

    return this.companiesService.getCompaniesByUser(userId);
  }

  @ApiOperation({
    summary: 'Get specific company',
    operationId: 'getCompany',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific company',
    type: Company,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Company> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add new company',
    operationId: 'addCompany',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added company',
    type: Company,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Company): Promise<Company> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit existing company',
    operationId: 'editCompany',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited company',
    type: Company,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Company,
  ): Promise<Company> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete existing company',
    operationId: 'deleteCompany',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted company',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
