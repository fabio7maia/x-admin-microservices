import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../users';

@Entity({
  name: 'quizzes_users_data',
})
export class QuizUserData extends BaseEntity {
  @ApiModelProperty()
  @ManyToOne(
    () => User,
    user => user.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'userId' })
  @Column({ length: 36, nullable: false, unique: true })
  userId: string;

  @ApiModelProperty()
  @Column({ nullable: false, default: 0 })
  points: number;

  @ApiModelProperty()
  @Column({ nullable: false, default: 0 })
  answers: number;

  @ApiModelProperty()
  @Column({ nullable: false, default: 0 })
  correctAnswers: number;
}
