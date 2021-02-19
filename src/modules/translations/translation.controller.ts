import {
  Controller,
  UseGuards,
  Query,
  Delete,
  Body,
  Req,
  Put,
  Post,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
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

@Controller('api/translations')
@ApiTags('Translations')
export class TranslationsController extends BaseController<Translation> {
  constructor(private readonly translationService: TranslationService) {
    super(translationService);
  }

  @ApiOperation({
    summary: 'List of translations',
    operationId: 'getTranslations',
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get specific translation',
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
  async get(@Query('id') id: string): Promise<Translation> {
    return super.getRecordById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Add translation',
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Edit translation',
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
    @Query('id') id: string,
    @Body() payload: Translation,
  ): Promise<Translation> {
    return super.updateRecord(req, id, payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Delete translation',
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
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
