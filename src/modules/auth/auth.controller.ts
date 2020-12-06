import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
  Req,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './';
import {
  AuthLoginServiceInput,
  AuthLoginServiceOutput,
  AuthRegisterServiceInput,
  AuthRegisterServiceOutput,
} from './types';
import { UsersService } from './../users';
import { BaseHelper } from '../base/base.helper';
import { AuthMeServiceOutput } from './types/me';

@Controller('api/auth')
@ApiUseTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({
    title: 'Login existing user',
    operationId: 'login',
  })
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Successful Login',
    type: AuthLoginServiceOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() payload: AuthLoginServiceInput,
  ): Promise<AuthLoginServiceOutput> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @ApiOperation({
    title: 'Register new user',
    operationId: 'register',
  })
  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Successful Registration',
    type: AuthRegisterServiceOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(
    @Req() req,
    @Body() payload: AuthRegisterServiceInput,
  ): Promise<AuthRegisterServiceOutput> {
    const user = await this.usersService.create(
      BaseHelper.getCurrentUserId(req),
      payload,
    );
    return await this.authService.createToken(user);
  }

  @ApiOperation({
    title: 'Get information about logged user',
    operationId: 'me',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
    type: AuthMeServiceOutput,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@Request() request): Promise<AuthMeServiceOutput> {
    return request.user;
  }
}
