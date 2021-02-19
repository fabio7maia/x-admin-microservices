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
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MenusService } from './';
import { BaseController } from '../base/base.controller';
import { Menu } from './menu.entity';
import { IFieldsOrder } from '../base/models/filter.model';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/menus')
@ApiTags('Menus')
export class MenusController extends BaseController<Menu> {
  constructor(private readonly menusService: MenusService) {
    super(menusService);
  }

  @ApiOperation({
    summary: 'List of menus',
    operationId: 'getMenus',
  })
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained list of menus',
    type: Menu,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@Req() req: Request, order?: IFieldsOrder): Promise<Menu[]> {
    return await super.getListOfRecords(req, {
      parentMenuId: 'ASC',
      weight: 'ASC',
    });
  }

  @ApiOperation({
    summary: 'Get specific menu',
    operationId: 'getMenu',
  })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful obtained specific menu',
    type: Menu,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@Query('id') id: string): Promise<Menu> {
    return super.getRecordById(id);
  }

  @ApiOperation({
    summary: 'Add menu',
    operationId: 'addMenu',
  })
  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added menu',
    type: Menu,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() payload: Menu): Promise<Menu> {
    return super.createRecord(req, payload);
  }

  @ApiOperation({
    summary: 'Edit menu',
    operationId: 'editMenu',
  })
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful edited menu',
    type: Menu,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Req() req,
    @Query('id') id: string,
    @Body() payload: Menu,
  ): Promise<Menu> {
    return super.updateRecord(req, id, payload);
  }

  @ApiOperation({
    summary: 'Delete menu',
    operationId: 'deleteMenu',
  })
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Successful deleted menu',
    type: DeleteResult,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Query('id') id: string): Promise<DeleteResult> {
    return super.deleteRecord(id);
  }
}
