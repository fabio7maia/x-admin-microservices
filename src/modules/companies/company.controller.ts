import {
  Controller,
  UseGuards,
  Get,
  Req,
  Param,
  Post,
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
import { CompaniesService } from './';
import { BaseController } from '../base/base.controller';
import { Company } from './company.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IFieldsOrder } from '../base/models/filter.model';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/companies')
@ApiUseTags('Companies')
export class CompaniesController extends BaseController<Company> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService);
  }

  @ApiOperation({
    title: 'Get list of companies',
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
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Company[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    title: 'Get data for specific company',
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
  async get(@Param('id') id: string): Promise<Company> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    title: 'Add new company',
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
    title: 'Edit existing company',
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
    @Param('id') id: string,
    @Body() payload: Company,
  ): Promise<Company> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    title: 'Delete existing company',
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
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
