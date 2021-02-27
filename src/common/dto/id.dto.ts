import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * ID param in a path
 */
export class IdDto {
  @Transform(Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id: number;
}
