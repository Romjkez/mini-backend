import { EntityRepository, Repository } from 'typeorm';
import { Test } from './test.entity';
import { GetManyTestsDto } from './dto/get-many-tests.dto';
import { from, Observable } from 'rxjs';
import { DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { addTestSort } from './utils/add-test-sort';
import { addTestFilter } from './utils/add-test-filter';
import { SimpleTest } from './models/simple-test.model';

@EntityRepository(Test)
export class TestRepository extends Repository<Test> {
  getMany(dto: GetManyTestsDto): Observable<[Array<SimpleTest>, number]> {
    let qb = this.createQueryBuilder('test')
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page))
      .loadRelationCountAndMap('test.oneOfQuestions', 'test.oneOfQuestions')
      .loadRelationCountAndMap('test.manyOfQuestions', 'test.manyOfQuestions')
      .loadRelationCountAndMap('test.exactAnswerQuestions', 'test.exactAnswerQuestions')
      .loadRelationCountAndMap('test.orderQuestions', 'test.orderQuestions')
      .leftJoinAndSelect('test.tags', 'tags');

    if (dto.sort) {
      qb = addTestSort(qb, dto.sort, 'test');
    }

    if (dto.filter) {
      qb = addTestFilter(qb, dto.filter, 'test');
    }

    return from(qb.getManyAndCount() as unknown as Promise<[Array<SimpleTest>, number]>);
  }
}
