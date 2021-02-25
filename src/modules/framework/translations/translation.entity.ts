import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'translations',
})
export class Translation extends BaseEntity {
  @ApiProperty()
  @Column({ length: 50, nullable: true })
  module: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  key: string;

  @ApiProperty()
  @Column({ length: 500, nullable: false })
  value: string;

  @ApiProperty()
  @Column({ length: 20, nullable: false })
  language: string;
}
