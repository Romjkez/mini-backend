import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ExerciseEntity } from '../exercise/exercise.entity';
import { Tag } from '../tag/tag.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 150, type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  video?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  @Column({ type: 'varchar', default: 'https://i.imgur.com/yLiIVxG.jpg', nullable: true })
  previewUrl?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @ManyToMany(() => UserEntity, user => user.finishedArticles)
  finishedBy: Array<UserEntity>;

  @ManyToMany(() => UserEntity, user => user.favoriteArticles)
  favoriteFor: Array<UserEntity>;

  @ManyToOne(() => ExerciseEntity, e => e.articles)
  exercise: ExerciseEntity;

  @Column({ type: 'smallint', default: null, nullable: true })
  order: number;

  @JoinTable()
  @ManyToMany(() => Tag, t => t.articles)
  tags: Array<Tag>;
}
