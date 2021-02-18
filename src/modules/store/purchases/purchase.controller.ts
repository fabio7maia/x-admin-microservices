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
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { StorePurchaseService } from '.';
import { AuthGuard } from '@nestjs/passport';
import { StorePurchaseInput, StorePurchaseOutput } from './purchase.models';
import { BaseHelper } from '../../base';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/store/purchases')
@ApiTags('Store Purchases')
export class StorePurchaseController {
  constructor(private readonly storePurchaseService: StorePurchaseService) {}

  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'Successful added store purchase',
    type: StorePurchaseOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async purchase(
    @Req() req,
    @Body() payload: StorePurchaseInput,
  ): Promise<StorePurchaseOutput> {
    const userId = BaseHelper.getCurrentUserId(req);
    const appId = BaseHelper.getCurrentAppId(req);

    return this.storePurchaseService.purchase(appId, userId, payload);
  }
}
