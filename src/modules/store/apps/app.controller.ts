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
import { StoreApp, StoreAppService } from '.';
import { BaseController } from '../../base/base.controller';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/store/apps')
@ApiTags('Store Apps')
export class StoreAppController extends BaseController<StoreApp> {
  constructor(private readonly storeAppService: StoreAppService) {
    super(storeAppService);
  }

  @ApiOperation({
    summary: 'Get list of store applications',
    operationId: 'getStoreApps',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of store applications',
    type: StoreApp,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<StoreApp[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific store application',
    operationId: 'getStoreApp',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific store application',
    type: StoreApp,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<StoreApp> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add store application',
    operationId: 'addStoreApp',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added store application',
    type: StoreApp,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: StoreApp): Promise<StoreApp> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit store application',
    operationId: 'editStoreApp',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited store application',
    type: StoreApp,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: StoreApp,
  ): Promise<StoreApp> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'delete store application',
    operationId: 'deleteStoreApp',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted store application',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
