import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { from, Observable } from 'rxjs';
import { CreateOptionBulkDto } from './dto/create-option-bulk.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { switchMap } from 'rxjs/operators';
import { OneOfQuestionEntity } from '../question/entities/one-of-question.entity';
import { ManyOfQuestionEntity } from '../question/entities/many-of-question.entity';
import { OrderQuestionEntity } from '../question/entities/order-question.entity';

@Injectable()
export class OptionService {
  constructor(@InjectRepository(Option)
              private readonly optionRepo: Repository<Option<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>>) {
  }

  createOne(dto: CreateOptionDto): Observable<Option<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>> {
    return from(this.optionRepo.save(dto));
  }

  createBulk(dto: CreateOptionBulkDto): Observable<Array<Option<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>>> {
    return from(this.optionRepo.save(dto.data));
  }

  update(id: number, dto: UpdateOptionDto): Observable<Option<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>> {
    return from(this.optionRepo.update(id, dto))
      .pipe(
        switchMap(async () => this.optionRepo.findOne(id)),
      );
  }

}
