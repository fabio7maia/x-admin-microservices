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
import { EntitiesRecordsService } from './';
import { BaseController } from '../base/base.controller';
import { EntityRecord } from './entityRecord.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/entities-records')
@ApiTags('Entities Records')
export class EntitiesRecordsController extends BaseController<EntityRecord> {
  constructor(private readonly entitiesRecordsService: EntitiesRecordsService) {
    super(entitiesRecordsService);
  }

  @ApiOperation({
    summary: 'Get list of entity records',
    operationId: 'listEntityRecords',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of entity records',
    type: EntityRecord,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<EntityRecord[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get data for specific entity record',
    operationId: 'getEntityRecord',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific entity record',
    type: EntityRecord,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<EntityRecord> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add new entity record',
    operationId: 'addEntityRecord',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added entity record',
    type: EntityRecord,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: EntityRecord,
  ): Promise<EntityRecord> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit existing entity record',
    operationId: 'editEntityRecord',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited entity record',
    type: EntityRecord,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: EntityRecord,
  ): Promise<EntityRecord> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete existing entity record',
    operationId: 'deleteEntityRecord',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted entity record',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
