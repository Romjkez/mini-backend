import { Crud, CrudController } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Article,
  },
})
@ApiTags('article')
@Controller('article')
export class ArticleController implements CrudController<Article> {
  constructor(public service: ArticleService) {
  }
}
