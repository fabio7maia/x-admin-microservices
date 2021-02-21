import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'menus',
})
export class Menu extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  routeUrl: string;

  @ApiProperty()
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

  @ApiProperty()
  @Column({ default: 100 })
  weight?: Number;
}
