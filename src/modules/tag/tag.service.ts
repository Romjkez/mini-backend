import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepo: Repository<Tag>) {
  }

  createOne(dto: CreateTagDto): Observable<Tag> {
    return from(this.tagRepo.save(dto));
  }

  createBulk(dto: Array<CreateTagDto>): Observable<Array<Tag>> {
    return from(this.tagRepo.save(dto));
  }
}
