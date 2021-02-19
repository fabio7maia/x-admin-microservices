import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Put,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './';
import { BaseController } from '../base/base.controller';
import { NewEntity } from './new.entity';
import { DeleteResult } from 'typeorm';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';

@Controller('api/news')
@ApiTags('News')
export class NewsController extends BaseController<NewEntity> {
  constructor(private readonly newsService: NewsService) {
    super(newsService);
  }

  @ApiOperation({
    summary: 'List of news',
    operationId: 'getNews',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of news',
    type: NewEntity,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<NewEntity[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    summary: 'Get specific new',
    operationId: 'getNew',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific new',
    type: NewEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<NewEntity> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add new',
    operationId: 'addNew',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added new',
    type: NewEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: NewEntity): Promise<NewEntity> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit new',
    operationId: 'editNew',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited new',
    type: NewEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: NewEntity,
  ): Promise<NewEntity> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete new',
    operationId: 'deleteNew',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted new',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
