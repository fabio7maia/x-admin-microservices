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
import { TranslationService } from './translation.service';
import { BaseController } from '../base/base.controller';
import { Translation } from './translation.entity';
import { DeleteResult } from 'typeorm';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/translations')
@ApiUseTags('Translations')
export class TranslationsController extends BaseController<Translation> {
  constructor(private readonly translationService: TranslationService) {
    super(translationService);
  }

  @ApiOperation({
    title: 'Get list of translations',
    operationId: 'listTranslations',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of translations',
    type: Translation,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @Req() req: Request,
    order?: IFieldsOrder,
  ): Promise<Translation[]> {
    return super.getListOfRecords(req, order);
  }

  @ApiOperation({
    title: 'Get data for specific translation',
    operationId: 'getTranslation',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific translation',
    type: Translation,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Param('id') id: string): Promise<Translation> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    title: 'Add new translation',
    operationId: 'addTranslation',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added translation',
    type: Translation,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Translation): Promise<Translation> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    title: 'Edit existing translation',
    operationId: 'editTranslation',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited configuration',
    type: Translation,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() payload: Translation,
  ): Promise<Translation> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    title: 'Delete existing translation',
    operationId: 'deleteTranslation',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted translation',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
