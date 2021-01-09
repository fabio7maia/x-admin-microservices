import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from '../../users';

export class BaseAuthServiceInput {
  @ApiModelProperty({
    required: true,
  })
  app: string;

  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  email: string;
}

export class BaseAuthServiceOutput {
  @ApiModelProperty()
  expiresIn: string;

  @ApiModelProperty()
  accessToken: string;

  @ApiModelProperty()
  user: User;
}
