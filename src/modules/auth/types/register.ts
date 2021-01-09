import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { BaseAuthServiceInput, BaseAuthServiceOutput } from './base';

export class AuthRegisterServiceInput extends BaseAuthServiceInput {
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
  @MinLength(5)
  password: string;
}

export class AuthRegisterServiceOutput extends BaseAuthServiceOutput {}
