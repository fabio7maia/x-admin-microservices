import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserServiceInput {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelPropertyOptional()
  password?: string;

  @ApiModelPropertyOptional()
  imageUrl?: string;

  @ApiModelPropertyOptional()
  providerId?: string;

  @ApiModelPropertyOptional()
  app?: string;

  @ApiModelPropertyOptional()
  active?: boolean;
}
