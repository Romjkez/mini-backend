import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Tag } from '../tag/tag.entity';
import { Test } from '../test/test.entity';
import { ArticleEntity } from '../article/article.entity';


@Entity('exercise')
export class ExerciseEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty()
  @Column({ type: 'varchar', length: 200 })
  title: string;

  @ApiModelProperty()
  @CreateDateColumn()
  createdAt: number;

  @ApiModelProperty()
  @UpdateDateColumn()
  updatedAt: number;

  @ApiModelProperty()
  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  @ApiModelProperty()
  @OneToMany(() => Test, t => t.id)
  @JoinColumn()
  tests: Array<Test>;

  @ApiModelProperty()
  @OneToMany(() => ArticleEntity, a => a.id)
  @JoinColumn()
  articles: Array<ArticleEntity>;

  @ApiModelProperty({ type: Tag, isArray: true })
  @ManyToMany(() => Tag, tag => tag.id, { eager: true })
  tags: Array<Tag>;
}
