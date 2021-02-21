import { Exclude } from 'class-transformer';
import { Entity, Column } from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100 })
  firstName: string;

  @ApiProperty()
  @Column({ length: 100 })
  lastName: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  email: string;

  @ApiPropertyOptional()
  @Column({
    name: 'password',
    length: 100,
    transformer: new PasswordTransformer(),
    select: false,
  })
  @Exclude()
  password?: string;

  @ApiPropertyOptional()
  @Column({ length: 150 })
  imageUrl?: string;

  @ApiPropertyOptional()
  @Column({ length: 50 })
  providerId?: string;
}
