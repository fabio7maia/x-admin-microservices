import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'menus',
})
export class Menu extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiModelProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  routeUrl: string;

  @ApiModelProperty()
  @ManyToOne(
    () => Menu,
    menu => menu.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'parentMenuId' })
  @Column({ length: 36, default: null })
  parentMenuId?: string;

  @ApiModelProperty()
  @Column({ default: 100 })
  weight?: Number;
}
