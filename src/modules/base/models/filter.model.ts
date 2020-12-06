export enum FieldFilterOperator {
  equal,
  like,
}

export interface IFieldFilter {
  name: string;
  operator?: FieldFilterOperator;
  value: any;
}

export interface IFieldsOrder {
  [x: string]: 'ASC' | 'DESC' | 1 | -1;
}
