import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'permissions',
})
export class Permission extends BaseEntity {
  @ApiProperty()
  @Column({ length: 10, nullable: false, unique: true })
  code: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiProperty()
  @Column({ default: 100 })
  weight?: Number;
}
