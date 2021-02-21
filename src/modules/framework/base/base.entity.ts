import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiPropertyOptional()
  @Column({ type: Boolean, default: true })
  active?: boolean;

  @ApiPropertyOptional()
  @Column({ length: 50, nullable: false })
  createdBy?: string;

  @ApiPropertyOptional()
  @Column({ type: Date, nullable: false, default: () => 'NOW()' })
  createdOn?: Date;

  @ApiPropertyOptional()
  @Column({ length: 50, default: null })
  modifiedBy?: string;

  @ApiPropertyOptional()
  @Column({ type: Date, default: null })
  modifiedOn?: Date;
}
