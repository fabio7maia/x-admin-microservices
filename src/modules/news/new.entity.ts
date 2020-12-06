import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'news',
})
export class NewEntity extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  title: string;

  @ApiModelProperty()
  @Column()
  image?: string;

  @ApiModelProperty()
  @Column()
  text?: string;
}
