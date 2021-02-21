import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../framework/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../framework/companies';

@Entity({
  name: 'store_products',
})
export class StoreProduct extends BaseEntity {
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
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250 })
  description?: string;

  @ApiProperty()
  @Column({ length: 250 })
  image?: string;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;

  @ApiProperty()
  @Column({ nullable: false })
  stock: number;
}
