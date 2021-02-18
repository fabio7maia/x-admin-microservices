import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'functionalities',
})
export class Functionality extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250 })
  description?: string;
}
