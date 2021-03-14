import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users';
import { Permission } from '../permissions';
import { Functionality } from '../functionalities';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users_permissions',
})
export class UserPermission extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 250 })
  description?: string;

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
    () => Permission,
    permission => permission.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'permissionId' })
  @Column({ length: 36, nullable: false })
  permissionId: string;

  // @ApiProperty()
  // @ManyToOne(
  //   () => Functionality,
  //   functionality => functionality.id,
  //   {
  //     cascade: ['insert', 'update'],
  //   },
  // )
  // @JoinColumn({ name: 'functionalityId' })
  // @Column({ length: 36, nullable: false })
  // functionalityId: string;
}
