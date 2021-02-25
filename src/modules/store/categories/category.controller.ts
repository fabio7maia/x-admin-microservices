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
import { StoreCategoryService, StoreCategory } from './';
import { BaseController } from '../../framework/base/base.controller';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../framework/base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { BaseHelper } from '../../framework/base';

@Controller('api/store/categories')
@ApiTags('Store Categories')
export class StoreCategoryController extends BaseController<StoreCategory> {
  constructor(private readonly storeCategoryService: StoreCategoryService) {
    super(storeCategoryService);
  }

  @ApiOperation({
    summary: 'List of store categories',
    operationId: 'listStoreCategories',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store categories',
    type: StoreCategory,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<StoreCategory[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'List of store categories by Company',
    operationId: 'listStoreCategoriesByCompany',
  })
  @Get('/company')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store categories by Company',
    type: StoreCategory,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCategoriesByCompany(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<StoreCategory[]> {
    const companyId = BaseHelper.getCurrentCompanyId(req);

    return super.getListOfRecords(req, order, { companyId });
  }

  @ApiOperation({
    summary: 'Get specific store category',
    operationId: 'getStoreCategory',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific store category',
    type: StoreCategory,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<StoreCategory> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add store category',
    operationId: 'addStoreCategory',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added store category',
    type: StoreCategory,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: StoreCategory,
  ): Promise<StoreCategory> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit store category',
    operationId: 'editStoreCategory',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited store category',
    type: StoreCategory,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: StoreCategory,
  ): Promise<StoreCategory> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete store category',
    operationId: 'deleteStoreCategory',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted store category',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
