import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './option.entity';

@Injectable()
export class OptionService extends TypeOrmCrudService<Option> {
    constructor(@InjectRepository(Option) repo) {
        super(repo);
    }
}
