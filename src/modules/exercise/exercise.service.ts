import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto, CreateExerciseInternalDto } from './dto/create-exercise.dto';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Test } from '../test/test.entity';
import { ArticleRepository } from '../article/article.repository';
import { Tag } from '../tag/tag.entity';

export const EXERCISE_RELATIONS = ['tests', 'articles', 'tags'];

@Injectable()
export class ExerciseService {
  constructor(@InjectRepository(ExerciseEntity) private readonly exerciseRepo: Repository<ExerciseEntity>,
              @InjectRepository(Test) private readonly testRepo: Repository<Test>,
              @InjectRepository(ArticleRepository) private readonly articleRepo: ArticleRepository,
              @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
              private readonly logger: Logger) {
    logger.setContext('ExerciseService');
  }

  async createOne(dto: CreateExerciseDto): Promise<ExerciseEntity> {
    const dtoWithRelations: CreateExerciseInternalDto = {
      title: dto.title,
      isVisible: dto.isVisible,
      tests: await this.testRepo.findByIds(dto.tests),
      tags: await this.tagRepo.findByIds(dto.tags),
      articles: await this.articleRepo.findByIds(dto.articles),
    };

    return from(this.exerciseRepo.save(dtoWithRelations))
      .pipe(
        switchMap(async (exercise: ExerciseEntity) =>
          this.exerciseRepo.findOne(exercise.id, { relations: EXERCISE_RELATIONS })),
      ).toPromise();
  }

  getById(id: number): Observable<ExerciseEntity> {
    return from(this.exerciseRepo.findOneOrFail(id, { relations: EXERCISE_RELATIONS }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}
