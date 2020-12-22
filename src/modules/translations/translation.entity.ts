import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'translations',
})
export class Translation extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 50, nullable: true })
  module: string;

  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  key: string;

  @ApiModelProperty()
  @Column({ length: 500, nullable: false })
  value: string;

  @ApiModelProperty()
  @Column({ length: 20, nullable: false })
  language: string;
}
