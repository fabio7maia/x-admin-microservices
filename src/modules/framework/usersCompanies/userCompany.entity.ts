import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { User } from '../../users';
import { Company } from '../companies';
import { Permission } from '../permissions';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users_companies',
})
export class UserCompany extends BaseEntity {
  @ApiProperty()
  @ManyToOne(
    () => User,
    user => user.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'userId' })
  @Column({ length: 36, nullable: false })
  userId: string;

  @ApiProperty()
  @ManyToOne(
    () => Company,
    company => company.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'companyId' })
  @Column({ length: 36, nullable: false })
  companyId: string;

  @ApiProperty()
  @ManyToOne(
    () => Permission,
    permission => permission.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'permissionId' })
  @Column({ length: 36, nullable: false })
  permissionId: string;
}
