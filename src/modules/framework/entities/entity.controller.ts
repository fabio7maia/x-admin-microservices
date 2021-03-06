import {
  Controller,
  UseGuards,
  Get,
  Query,
  Req,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EntitiesService, Entity } from './';
import { BaseController } from '../base/base.controller';
import { FieldsService } from '../fields';
import { EntitiesGetModelDataServiceOutput } from './types/EntitiesGetModelData';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/entities')
@ApiTags('Entities')
export class EntitiesController extends BaseController<Entity> {
  constructor(
    private readonly entitiesService: EntitiesService,
    private readonly fieldsService: FieldsService,
  ) {
    super(entitiesService);
  }

  @ApiOperation({
    summary: 'Get model data for specific entity',
    operationId: 'getModelDataEntity',
  })
  @Get('/model-data/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained model data of specific entity',
    type: EntitiesGetModelDataServiceOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getModelDataById(
    @Query('id') id: string,
  ): Promise<EntitiesGetModelDataServiceOutput> {
    const entity = await this.entitiesService.get(id);

    const fields = await this.fieldsService.all({
      where: { entityId: id },
    });

    return {
      ...entity,
      fields,
    };
  }

  @ApiOperation({
    summary: 'List of entities',
    operationId: 'listEntities',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of companies',
    type: Entity,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Entity[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific entity',
    operationId: 'getEntity',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific entity',
    type: Entity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Entity> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add new entity',
    operationId: 'addEntity',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added entity',
    type: Entity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Entity): Promise<Entity> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit existing entity',
    operationId: 'editEntity',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited entity',
    type: Entity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Entity,
  ): Promise<Entity> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete existing entity',
    operationId: 'deleteEntity',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted entity',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
