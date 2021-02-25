import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '../../framework/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../framework/users';
import { Company } from '../../framework/companies';

@Entity({
  name: 'store_clients',
})
@Unique(['companyId', 'userId'])
export class StoreClient extends BaseEntity {
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
  @Column({ length: 100, nullable: false })
  fullName: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  address: string;

  @ApiProperty()
  @Column()
  taxPayerNumber?: number;
}
