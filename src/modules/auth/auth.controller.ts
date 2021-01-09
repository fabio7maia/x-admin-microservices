import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
  Req,
  UnauthorizedException,
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
  AuthLoginExternalProviderServiceInput,
  AuthLoginExternalProviderServiceOutput,
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
  constructor(private readonly authService: AuthService) {}

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
    title: 'Login or register existing user from external provider',
    operationId: 'loginFromExternalProvider',
  })
  @Post('loginFromExternalProvider')
  @ApiResponse({
    status: 200,
    description:
      'Successful login or register existing user from external provider',
    type: AuthLoginExternalProviderServiceOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async loginFromExternalProvider(
    @Req() req,
    @Body() payload: AuthLoginExternalProviderServiceInput,
  ): Promise<AuthLoginExternalProviderServiceOutput> {
    const user = await this.authService.treatLoginFromExternalProvider(
      BaseHelper.getCurrentUserId(req),
      payload,
    );

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
    const user = await this.authService.register(
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
