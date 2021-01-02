import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { QuizQuestion } from '../quizzesQuestions';

@Entity({
  name: 'quizzes_questions_answers',
})
export class QuizQuestionAnswer extends BaseEntity {
  @ApiModelProperty()
  @ManyToOne(
    () => QuizQuestion,
    quizQuestion => quizQuestion.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'quizQuestionId' })
  @Column({ length: 36, nullable: false })
  quizQuestionId: string;

  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  answer: string;

  @ApiModelProperty()
  @Column({ type: Boolean, default: false })
  correctAnswer?: boolean;
}
