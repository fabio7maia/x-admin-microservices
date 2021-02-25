import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from '../../users';

export class BaseAuthServiceInput {
  @ApiProperty({
    required: true,
  })
  app: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  email: string;
}

export class BaseAuthServiceOutput {
  @ApiProperty()
  expiresIn: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: User;
}
