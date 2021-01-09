import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 100 })
  firstName: string;

  @ApiModelProperty()
  @Column({ length: 100 })
  lastName: string;

  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  email: string;

  @ApiModelPropertyOptional()
  @Column({
    name: 'password',
    length: 100,
    transformer: new PasswordTransformer(),
    select: false,
  })
  @Exclude()
  password?: string;

  @ApiModelPropertyOptional()
  @Column({ length: 150 })
  imageUrl?: string;

  @ApiModelPropertyOptional()
  @Column({ length: 50 })
  providerId?: string;
}
