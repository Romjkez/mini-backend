import { GetManyDto } from '../../../common/dto/get-many.dto';

export class GetManyArticlesDto extends GetManyDto {
  sort: any;

  filter: any;
}
