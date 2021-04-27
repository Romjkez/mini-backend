import { EntityRepository, Repository } from 'typeorm';
import { FinishedTest } from './finished-test.entity';

@EntityRepository(FinishedTest)
export class FinishedTestRepository extends Repository<FinishedTest> {}
