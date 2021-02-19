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
import { ModesService } from './';
import { BaseController } from '../../base/base.controller';
import { Mode } from './mode.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/modes')
@ApiTags('Modes')
export class ModesController extends BaseController<Mode> {
  constructor(private readonly modesService: ModesService) {
    super(modesService);
  }

  @ApiOperation({
    summary: 'List of modes',
    operationId: 'getModes',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of modes',
    type: Mode,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Mode[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific mode',
    operationId: 'getMode',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific mode',
    type: Mode,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Mode> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add mode',
    operationId: 'addMode',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added mode',
    type: Mode,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Mode): Promise<Mode> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit mode',
    operationId: 'editMode',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited mode',
    type: Mode,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Mode,
  ): Promise<Mode> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete mode',
    operationId: 'deleteMode',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted mode',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
