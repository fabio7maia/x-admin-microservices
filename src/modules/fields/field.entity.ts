import {
  Entity as EntityTypeOrm,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Entity } from '../entities';
import { Type } from '../types';
import { Permission } from '../permissions';
import { ApiModelProperty } from '@nestjs/swagger';

@EntityTypeOrm({
  name: 'fields',
})
export class Field extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiModelProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiModelProperty()
  @ManyToOne(
    () => Entity,
    entity => entity.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'entityId' })
  @Column({ length: 36, nullable: false })
  entityId: string;

  @ApiModelProperty()
  @ManyToOne(
    () => Type,
    type => type.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'typeId' })
  @Column({ length: 36, nullable: false })
  typeId: string;

  @ApiModelProperty()
  @ManyToOne(
    () => Permission,
    permission => permission.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'permissionId' })
  @Column({ length: 36, nullable: false })
  permissionId: string;
}
