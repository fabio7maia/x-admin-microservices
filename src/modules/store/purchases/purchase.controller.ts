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
import { StorePurchaseService } from './purchase.service';
import { AuthGuard } from '@nestjs/passport';
import { StorePurchaseInput, StorePurchaseOutput } from './purchase.models';
import { BaseHelper } from '../../framework/base';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/store/purchases')
@ApiTags('Store Purchases')
export class StorePurchaseController {
  constructor(private readonly storePurchaseService: StorePurchaseService) {}

  @ApiOperation({
    summary: 'Add store purchase',
    operationId: 'addStorePurchase',
  })
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
    const companyId = BaseHelper.getCurrentCompanyId(req);

    return this.storePurchaseService.purchase(companyId, userId, payload);
  }
}
