import { DEFAULT_PAGE } from './dto/get-many.dto';
import { SelectQueryBuilder } from 'typeorm';

export function calculateQueryOffset(perPage: number, page: number): number {
  return perPage * (page - 1) || DEFAULT_PAGE - 1;
}

export const isExistsQuery = <T>(builder: SelectQueryBuilder<T>): string => `exists (${builder.getQuery()})`;
