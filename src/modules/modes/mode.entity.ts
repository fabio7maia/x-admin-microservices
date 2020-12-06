import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'modes',
})
export class Mode extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiModelProperty()
  @Column({ length: 250 })
  description?: string;
}
