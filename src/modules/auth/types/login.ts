import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { BaseAuthServiceInput, BaseAuthServiceOutput } from './base';

export class AuthLoginServiceInput extends BaseAuthServiceInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class AuthLoginServiceOutput extends BaseAuthServiceOutput {}

export class AuthLoginExternalProviderServiceInput extends BaseAuthServiceInput {
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
  providerId: string;

  @ApiProperty()
  imageUrl: string;
}

export class AuthLoginExternalProviderServiceOutput extends BaseAuthServiceOutput {}
