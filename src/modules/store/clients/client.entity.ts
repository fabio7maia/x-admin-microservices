import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users';
import { Company } from '../../framework/companies';

@Entity({
  name: 'store_clients',
})
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
