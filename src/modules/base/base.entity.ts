import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiModelProperty()
  @Column({ type: Boolean, default: true })
  active?: boolean;

  @ApiModelProperty()
  @Column({ length: 50, nullable: false })
  createdBy?: string;

  @ApiModelProperty()
  @Column({ type: Date, nullable: false, default: () => 'NOW()' })
  createdOn?: Date;

  @ApiModelProperty()
  @Column({ length: 50, default: null })
  modifiedBy?: string;

  @ApiModelProperty()
  @Column({ type: Date, default: null })
  modifiedOn?: Date;
}
