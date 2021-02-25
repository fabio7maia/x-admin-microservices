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
import { StoreClient, StoreClientService } from './';
import { BaseController } from '../../framework/base/base.controller';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../framework/base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { BaseHelper } from '../../framework/base';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/store/clients')
@ApiTags('Store Clients')
export class StoreClientController extends BaseController<StoreClient> {
  constructor(private readonly storeClientService: StoreClientService) {
    super(storeClientService);
  }

  @ApiOperation({
    summary: 'List of store clients',
    operationId: 'listStoreClients',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store clients',
    type: StoreClient,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<StoreClient[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'List of store clients by company',
    operationId: 'listStoreClientsByCompany',
  })
  @Get('/company')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store clients by company',
    type: StoreClient,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listByCompany(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<StoreClient[]> {
    const companyId = BaseHelper.getCurrentCompanyId(req);

    return super.getListOfRecords(req, order, { companyId });
  }

  @ApiOperation({
    summary: 'Get Specific store client',
    operationId: 'getStoreClient',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific store client',
    type: StoreClient,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<StoreClient> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add store client',
    operationId: 'addStoreClient',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added store client',
    type: StoreClient,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: StoreClient): Promise<StoreClient> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit store client',
    operationId: 'editStoreClient',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited store client',
    type: StoreClient,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: StoreClient,
  ): Promise<StoreClient> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete store client',
    operationId: 'deleteStoreClient',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted store client',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
