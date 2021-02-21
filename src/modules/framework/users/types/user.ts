import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserServiceInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  imageUrl?: string;

  @ApiPropertyOptional()
  providerId?: string;

  @ApiPropertyOptional()
  app?: string;

  @ApiPropertyOptional()
  active?: boolean;
}
