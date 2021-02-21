import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../framework/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'quizzes',
})
export class Quiz extends BaseEntity {
  @ApiProperty()
  @Column({ length: 50, nullable: false, unique: true })
  code: string;

  @ApiProperty()
  @Column({ length: 50, nullable: false })
  description?: string;
}
