import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ unsigned: true }) id: number;

  @Column({ length: 150, type: 'varchar' })
  title: string;

  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  @ManyToMany(() => User, user => user.finishedArticles)
  finishedBy: Array<User>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: number;
}
