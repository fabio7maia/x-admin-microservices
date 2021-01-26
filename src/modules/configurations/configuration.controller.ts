import {
  Controller,
  UseGuards,
  Delete,
  Body,
  Req,
  Put,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigurationsService } from './configuration.service';
import { BaseController } from '../base/base.controller';
import { Configuration } from './configuration.entity';
import { DeleteResult } from 'typeorm';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/configurations')
@ApiTags('Configurations')
export class ConfigurationsController extends BaseController<Configuration> {
  constructor(private readonly configurationsService: ConfigurationsService) {
    super(configurationsService);
  }

  @ApiOperation({
    summary: 'Get list of configurations',
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
    summary: 'Get data for specific configuration',
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
  async get(@Query('id') id: string): Promise<Configuration> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add new configuration',
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
    summary: 'Edit existing configuration',
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
    @Query('id') id: string,
    @Body() payload: Configuration,
  ): Promise<Configuration> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete existing configuration',
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
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
