import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiModelPropertyOptional()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiModelPropertyOptional()
  @Column({ type: Boolean, default: true })
  active?: boolean;

  @ApiModelPropertyOptional()
  @Column({ length: 50, nullable: false })
  createdBy?: string;

  @ApiModelPropertyOptional()
  @Column({ type: Date, nullable: false, default: () => 'NOW()' })
  createdOn?: Date;

  @ApiModelPropertyOptional()
  @Column({ length: 50, default: null })
  modifiedBy?: string;

  @ApiModelPropertyOptional()
  @Column({ type: Date, default: null })
  modifiedOn?: Date;
}
