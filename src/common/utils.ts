import { DEFAULT_PAGE } from './dto/get-many.dto';

export function calculateQueryOffset(perPage: number, page: number): number {
  return perPage * (page - 1) || DEFAULT_PAGE - 1;
}
