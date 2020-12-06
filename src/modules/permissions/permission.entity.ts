import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'permissions',
})
export class Permission extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 10, nullable: false, unique: true })
  code: string;

  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiModelProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiModelProperty()
  @Column({ default: 100 })
  weight?: Number;
}
