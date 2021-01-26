import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { BaseAuthServiceInput, BaseAuthServiceOutput } from './base';

export class AuthRegisterServiceInput extends BaseAuthServiceInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class AuthRegisterServiceOutput extends BaseAuthServiceOutput {}
