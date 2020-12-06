import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../users';

export class AuthRegisterServiceInput {
  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  email: string;

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

export class AuthRegisterServiceOutput {
  @ApiModelProperty()
  expiresIn: string;
  @ApiModelProperty()
  accessToken: string;
  @ApiModelProperty()
  user: User;
}
