import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'configurations',
})
export class Configuration extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  key: string;

  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  value: string;
}
