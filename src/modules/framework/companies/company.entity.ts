import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'companies',
})
export class Company extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiProperty()
  @Column({ length: 250, nullable: false })
  url: string;
}
