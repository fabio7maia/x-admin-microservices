import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../framework/base';
import { ApiProperty } from '@nestjs/swagger';
import { QuizQuestion } from '../questions';

@Entity({
  name: 'quizzes_questions_answers',
})
export class QuizQuestionAnswer extends BaseEntity {
  @ApiProperty()
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

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  answer: string;

  @ApiProperty()
  @Column({ type: Boolean, default: false })
  correctAnswer?: boolean;
}
