import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../framework/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../framework/companies';

@Entity({
  name: 'store_categories',
})
export class StoreCategory extends BaseEntity {
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
  // @ManyToOne(
  //   () => StoreCategory,
  //   category => category.id,
  //   {
  //     cascade: ['insert', 'update'],
  //   },
  // )
  @JoinColumn({ name: 'parentCategoryId' })
  @Column({ length: 36, default: null })
  parentCategoryId?: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250, default: null })
  description?: string;
}
