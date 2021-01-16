import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base';
import { ApiModelProperty } from '@nestjs/swagger';
import { Quiz } from '../quizzes';

@Entity({
  name: 'quizzes_questions',
})
export class QuizQuestion extends BaseEntity {
  @ApiModelProperty()
  @ManyToOne(
    () => Quiz,
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
