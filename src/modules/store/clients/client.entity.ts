import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { StoreApp } from '../apps';
import { User } from '../../users';

@Entity({
  name: 'store_clients',
})
export class StoreClient extends BaseEntity {
  @ApiProperty()
  @ManyToOne(
    () => StoreApp,
    storeApp => storeApp.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'storeAppId' })
  @Column({ length: 36, nullable: false })
  storeAppId: string;

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
