import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ExerciseEntity } from '../exercise/exercise.entity';
import { ArticleEntity } from '../article/article.entity';
import { Test } from '../test/test.entity';

@Entity('tag')
export class Tag {
  @ApiModelProperty({ example: 1 })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ example: 'Clubman', maxLength: 20 })
  @Index({ unique: true })
  @Column({ nullable: true, type: 'varchar', length: 20, unique: true })
  text: string;

  @ManyToMany(() => ExerciseEntity, e => e.tags)
  exercises: Array<ExerciseEntity>;

  @ManyToMany(() => ArticleEntity, a => a.tags)
  articles: Array<ArticleEntity>;

  @ManyToMany(() => Test, t => t.tags)
  tests: Array<Test>;
}
