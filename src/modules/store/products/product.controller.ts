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
import { StoreProduct, StoreProductService } from '.';
import { BaseController } from '../../framework/base/base.controller';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../framework/base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { BaseHelper } from '../../framework/base';
@Controller('api/store/products')
@ApiTags('Store Products')
export class StoreProductController extends BaseController<StoreProduct> {
  constructor(private readonly storeProductService: StoreProductService) {
    super(storeProductService);
  }

  @ApiOperation({
    summary: 'List of store products',
    operationId: 'listStoreProducts',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store products',
    type: StoreProduct,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<StoreProduct[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'List of store products by Company',
    operationId: 'listStoreProductsByCompany',
  })
  @Get('/company')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store products by Company',
    type: StoreProduct,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProductsByCompany(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<StoreProduct[]> {
    const companyId = BaseHelper.getCurrentCompanyId(req);

    return super.getListOfRecords(req, order, { companyId });
  }

  @ApiOperation({
    summary: 'Get specific store product',
    operationId: 'getStoreProduct',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific store product',
    type: StoreProduct,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<StoreProduct> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add store product',
    operationId: 'addStoreProduct',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added store product',
    type: StoreProduct,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: StoreProduct,
  ): Promise<StoreProduct> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit store product',
    operationId: 'editStoreProduct',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited store product',
    type: StoreProduct,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: StoreProduct,
  ): Promise<StoreProduct> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete store product',
    operationId: 'deleteStoreProduct',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted store product',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
