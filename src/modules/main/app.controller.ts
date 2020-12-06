import { Get, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiUseTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('api/main')
@ApiUseTags('Main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  root(): string {
    return this.appService.root();
  }
}
