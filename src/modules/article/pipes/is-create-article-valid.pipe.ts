import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';

@Injectable()
export class IsCreateArticleValidPipe implements PipeTransform {
  transform(value: CreateArticleDto): any {
    if (value.content) {
      if (typeof value.content === 'string' && value.content.length > 2 && !value.video) {
        return value;
      }
      throw new BadRequestException('WRONG_CONTENT');
    } else {
      if (typeof value.video === 'string' && value.video.match(/(youtube.com)|(youtu.be)/is)) {
        return value;
      }
      throw new BadRequestException('WRONG_VIDEO_CONTENT');
    }
  }
}
