import {
  Controller,
  UseGuards,
  Param,
  Delete,
  Body,
  Req,
  Put,
  Post,
  Get,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigurationsDbService } from './configuration-db.service';
import { BaseController } from '../base/base.controller';
import { Configuration } from './configuration.entity';
import { DeleteResult } from 'typeorm';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/configurations')
@ApiUseTags('Configurations')
export class ConfigurationsController extends BaseController<Configuration> {
  constructor(
    private readonly configurationsDbService: ConfigurationsDbService,
  ) {
    super(configurationsDbService);
  }

  @ApiOperation({
    title: 'Get list of configurations',
    operationId: 'listConfigurations',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of configurations',
    type: Configuration,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<Configuration[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    title: 'Get data for specific configuration',
    operationId: 'getConfiguration',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific configuration',
    type: Configuration,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Param('id') id: string): Promise<Configuration> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    title: 'Add new configuration',
    operationId: 'addConfiguration',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added configuration',
    type: Configuration,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: Configuration,
  ): Promise<Configuration> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    title: 'Edit existing configuration',
    operationId: 'editConfiguration',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited configuration',
    type: Configuration,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() payload: Configuration,
  ): Promise<Configuration> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    title: 'Delete existing configuration',
    operationId: 'deleteConfiguration',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted configuration',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
