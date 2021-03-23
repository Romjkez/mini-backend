import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

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

  @JoinTable()
  @ManyToMany(() => UserEntity, async user => user.finishedArticles, { lazy: true })
  finishedBy: Promise<Array<UserEntity>>;

  @Column({ type: 'varchar', default: null, nullable: true })
  previewUrl?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: number;

  @JoinTable()
  @ManyToMany(() => UserEntity, async user => user.favoriteArticles, { lazy: true })
  favoriteFor: Promise<Array<UserEntity>>;
}
