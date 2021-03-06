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
import { TypesService } from './';
import { BaseController } from '../base/base.controller';
import { Type } from './type.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/types')
@ApiTags('Types')
export class TypesController extends BaseController<Type> {
  constructor(private readonly typesService: TypesService) {
    super(typesService);
  }

  @ApiOperation({
    summary: 'List of types',
    operationId: 'listTypes',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of types',
    type: Type,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Type[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific type',
    operationId: 'getType',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific type',
    type: Type,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Type> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add type',
    operationId: 'addType',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added type',
    type: Type,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Type): Promise<Type> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit type',
    operationId: 'editType',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited type',
    type: Type,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Type,
  ): Promise<Type> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete type',
    operationId: 'deleteType',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted type',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
