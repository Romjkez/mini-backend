import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true }) id: number;

  @Column({ length: 50, type: 'varchar' })
  firstName: string;

  @Column({ length: 50, type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ length: 100, type: 'varchar' })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: number;

  @Column({ type: 'boolean', default: false })
  isPrivate: boolean;

  @Column({ type: 'tinyint', nullable: true })
  rating: number;

  @ManyToMany(() => Article, article => article.finishedBy)
  finishedArticles: Array<Article>; // todo: replace string

  finishedTests: Array<string>; // todo: replace string

}
