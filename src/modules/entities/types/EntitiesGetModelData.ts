import { Entity } from '../entity.entity';
import { Field } from '../../fields';
import { ApiModelProperty } from '@nestjs/swagger';

export class EntitiesGetModelDataServiceOutput extends Entity {
  @ApiModelProperty()
  fields: Field[];
}
