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
import { ApiProperty } from '@nestjs/swagger';

@EntityTypeOrm({
  name: 'fields',
})
export class Field extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiProperty()
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

  @ApiProperty()
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

  @ApiProperty()
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
