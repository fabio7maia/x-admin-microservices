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
import { FieldsService } from '.';
import { BaseController } from '../../base/base.controller';
import { Field } from './field.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/fields')
@ApiTags('Fields')
export class FieldsController extends BaseController<Field> {
  constructor(private readonly fieldsService: FieldsService) {
    super(fieldsService);
  }

  @ApiOperation({
    summary: 'List of fields',
    operationId: 'getFields',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of fields',
    type: Field,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Field[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific field',
    operationId: 'getField',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific field',
    type: Field,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Field> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add field',
    operationId: 'addField',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added field',
    type: Field,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Field): Promise<Field> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit field',
    operationId: 'editField',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited field',
    type: Field,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Field,
  ): Promise<Field> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete field',
    operationId: 'deleteField',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted field',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
