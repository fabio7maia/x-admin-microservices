import { Entity } from '../entity.entity';
import { Field } from '../../fields';
import { ApiProperty } from '@nestjs/swagger';

export class EntitiesGetModelDataServiceOutput extends Entity {
  @ApiProperty()
  fields: Field[];
}
