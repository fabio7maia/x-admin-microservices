import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../framework/base';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../framework/users';

@Entity({
  name: 'quizzes_users_data',
})
export class QuizUserData extends BaseEntity {
  @ApiProperty()
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

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  points: number;

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  answers: number;

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  correctAnswers: number;
}
