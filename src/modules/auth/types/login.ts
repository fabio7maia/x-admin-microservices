import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { BaseAuthServiceInput, BaseAuthServiceOutput } from './base';

export class AuthLoginServiceInput extends BaseAuthServiceInput {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class AuthLoginServiceOutput extends BaseAuthServiceOutput {}

export class AuthLoginExternalProviderServiceInput extends BaseAuthServiceInput {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  lastName: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  providerId: string;

  @ApiModelProperty()
  imageUrl: string;
}

export class AuthLoginExternalProviderServiceOutput extends BaseAuthServiceOutput {}
