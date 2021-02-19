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
import { FunctionalitiesService } from './';
import { BaseController } from '../../base/base.controller';
import { Functionality } from './functionality.entity';
import { AuthGuard } from '@nestjs/passport';
import { IFieldsOrder } from '../../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/functionalities')
@ApiTags('Functionalities')
export class FunctionalitiesController extends BaseController<Functionality> {
  constructor(private readonly functionalitiesService: FunctionalitiesService) {
    super(functionalitiesService);
  }

  @ApiOperation({
    summary: 'List of functionalities',
    operationId: 'getFunctionalities',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of functionalities',
    type: Functionality,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<Functionality[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific functionality',
    operationId: 'getFunctionality',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific functionality',
    type: Functionality,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Functionality> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add functionality',
    operationId: 'addFunctionality',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added functionality',
    type: Functionality,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req,
    @Body() payload: Functionality,
  ): Promise<Functionality> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit functionality',
    operationId: 'editFunctionality',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited functionality',
    type: Functionality,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Functionality,
  ): Promise<Functionality> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete functionality',
    operationId: 'deleteFunctionality',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted functionality',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
