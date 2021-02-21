import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../framework/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { StoreProduct } from '../products';
import { Company } from '../../framework/companies';

export enum StoreOrderStatus {
  draft = 'draft',
}
@Entity({
  name: 'store_orders',
})
export class StoreOrder extends BaseEntity {
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
  @Column({ length: 250, nullable: false })
  address: string;

  @ApiProperty()
  @Column({ nullable: false, default: StoreOrderStatus.draft })
  status: StoreOrderStatus;
}

@Entity({
  name: 'store_orders_products',
})
export class StoreOrderProduct extends BaseEntity {
  @ApiProperty()
  @ManyToOne(
    () => StoreOrder,
    storeOrder => storeOrder.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'storeOrderId' })
  @Column({ length: 36, nullable: false })
  storeOrderId: string;

  @ApiProperty()
  @ManyToOne(
    () => StoreProduct,
    storeProduct => storeProduct.id,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'storeProductId' })
  @Column({ length: 36, nullable: false })
  storeProductId: string;

  @ApiProperty()
  @Column({ nullable: false })
  quantity: number;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  discount: number;
}
