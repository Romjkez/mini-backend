import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Observable } from 'rxjs';
import { Tag } from './tag.entity';
import { CreateTagBulkDto } from './dto/create-tag-bulk.dto';
import { GetManyTagsDto } from './dto/get-many-tags.dto';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {
  }

  @Post()
  createOne(@Body() dto: CreateTagDto): Observable<Tag> {
    return this.tagService.createOne(dto);
  }

  @Post('bulk')
  createBulk(@Body() dto: CreateTagBulkDto): Observable<Array<Tag>> {
    return this.tagService.createBulk(dto.data);
  }

  @Post('getMany')
  @HttpCode(200)
  getMany(@Body() dto: GetManyTagsDto): Observable<Array<Tag>> {
    return this.tagService.getMany(dto);
  }
}
