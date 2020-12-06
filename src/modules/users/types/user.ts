import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserServiceInput {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  firstName?: string;

  @ApiModelProperty()
  lastName?: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
