import { DateTime } from 'luxon';

export function DateTransformer(value: any): Date {
  if (!value || value instanceof Date) {
    return value;
  }

  return DateTime.fromSQL(value, { zone: 'UTC' }).toJSDate();
}
