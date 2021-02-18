import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { StoreApp } from '../apps';

@Entity({
  name: 'store_products',
})
export class StoreProduct extends BaseEntity {
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
