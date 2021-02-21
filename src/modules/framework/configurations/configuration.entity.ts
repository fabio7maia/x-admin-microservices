import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'configurations',
})
export class Configuration extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  key: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  value: string;
}
