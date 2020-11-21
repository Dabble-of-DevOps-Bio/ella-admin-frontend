import { isDate } from 'lodash';

export function DateTransformer(value: any): Date {
  return (value && !isDate(value)) ? new Date(value.replace(/\s/g, 'T')) : value;
}
