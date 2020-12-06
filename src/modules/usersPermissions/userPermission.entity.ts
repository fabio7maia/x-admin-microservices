import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users';
import { Company } from '../companies';
import { Permission } from '../permissions';
import { Functionality } from '../functionalities';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({
  name: 'users_permissions',
})
export class UserPermission extends BaseEntity {
  @ApiModelProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 250 })
  description?: string;

  @ApiModelProperty()
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

  @ApiModelProperty()
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

  @ApiModelProperty()
  @ManyToOne(
    () => Functionality,
    functionality => functionality.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'functionalityId' })
  @Column({ length: 36, nullable: false })
  functionalityId: string;
}
