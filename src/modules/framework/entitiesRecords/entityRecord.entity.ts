import {
  Entity as EntityTypeOrm,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Entity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

@EntityTypeOrm({
  name: 'entities_records',
})
export class EntityRecord extends BaseEntity {
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
  @Column({ type: 'text', nullable: false })
  data: string;
}
