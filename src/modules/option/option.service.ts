import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { from, Observable } from 'rxjs';
import { CreateOptionBulkDto } from './dto/create-option-bulk.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class OptionService {
  constructor(@InjectRepository(Option) private readonly optionRepo: Repository<Option>) {
  }

  createOne(dto: CreateOptionDto): Observable<Option> {
    return from(this.optionRepo.save(dto));
  }

  createBulk(dto: CreateOptionBulkDto): Observable<Array<Option>> {
    return from(this.optionRepo.save(dto.data));
  }

  update(id: number, dto: UpdateOptionDto): Observable<Option> {
    return from(this.optionRepo.update(id, dto))
      .pipe(
        switchMap(() => this.optionRepo.findOne(id)),
      );
  }

}
