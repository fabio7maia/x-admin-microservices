import {
  Entity as EntityTypeOrm,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Permission } from '../permissions';
import { ApiProperty } from '@nestjs/swagger';

@EntityTypeOrm({
  name: 'entities',
})
export class Entity extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250 })
  description?: string;

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
