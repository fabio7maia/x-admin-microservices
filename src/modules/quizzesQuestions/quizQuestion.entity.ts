import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { QuizEntity } from '../quizzes';

@Entity({
  name: 'quizzes_questions',
})
export class QuizQuestionEntity extends BaseEntity {
  @ApiModelProperty()
  @ManyToOne(
    () => QuizEntity,
    quiz => quiz.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'quizId' })
  @Column({ length: 36, nullable: false })
  quizId: string;

  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  question: string;
}
