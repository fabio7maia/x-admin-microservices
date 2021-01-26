import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'news',
})
export class NewEntity extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  title: string;

  @ApiProperty()
  @Column()
  image?: string;

  @ApiProperty()
  @Column()
  text?: string;
}
