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
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { StoreOrderProduct, StoreOrderService } from '.';
import { BaseController } from '../../base/base.controller';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/store/orders')
@ApiTags('Store Orders')
export class StoreOrderController extends BaseController<StoreOrderProduct> {
  constructor(private readonly storeOrderService: StoreOrderService) {
    super(storeOrderService);
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store order products',
    type: StoreOrderProduct,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<StoreOrderProduct[]> {
    return super.getListOfRecords(req, order);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific store order product',
    type: StoreOrderProduct,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<StoreOrderProduct> {
    return super.getRecordById(id);
  }

  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added store order product',
    type: StoreOrderProduct,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: StoreOrderProduct,
  ): Promise<StoreOrderProduct> {
    return super.createRecord(req, payload);
  }

  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited store order product',
    type: StoreOrderProduct,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: StoreOrderProduct,
  ): Promise<StoreOrderProduct> {
    return super.updateRecord(req, id, payload);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted store order product',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
