import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'quizzes',
})
export class Quiz extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 50, nullable: false, unique: true })
  code: string;

  @ApiModelProperty()
  @Column({ length: 50, nullable: false })
  description?: string;
}
