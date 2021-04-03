import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../framework/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../framework/companies';
import { StoreCategory } from '../categories';
import { FileUpload } from '../../assetsStorage/assetsStorage.types';

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
  @ManyToOne(
    () => StoreCategory,
    category => category.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'categoryId' })
  @Column({ length: 36, nullable: false })
  categoryId: string;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 250, default: null })
  description?: string;

  @Column({ length: 250, nullable: false })
  image: string;

  @ApiProperty()
  imageFileUpload: FileUpload;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;

  @ApiProperty()
  @Column({ nullable: false })
  stock: number;
}
