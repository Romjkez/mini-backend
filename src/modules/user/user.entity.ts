import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { FinishedTest } from '../finished-test/finished-test.entity';
import { SimpleUser } from './models/simple-user.model';
import { UserRole } from './models/user-role.enum';

/**
 * Plain user object from database
 */
@Entity({ name: 'user' })
export class UserEntity extends SimpleUser {
  @PrimaryGeneratedColumn({ unsigned: true, comment: 'Unique identifier' })
  id: number;

  @Column({ type: 'varchar', nullable: false, comment: 'User password' })
  password: string;

  @Column({ length: 50, type: 'varchar', comment: 'First name' })
  firstName: string;

  @Column({ length: 50, type: 'varchar', comment: 'Last name' })
  lastName: string;

  @Column({ length: 100, type: 'varchar', nullable: false, comment: 'Email', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, comment: 'Employer of user' })
  company?: string;

  @CreateDateColumn({ type: 'timestamp', comment: 'Account creation date' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    comment: 'Last account update',
  })
  updatedAt?: Date;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'If user prefers to hide profile from users rating',
  })
  isPrivate: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: 'Account ban date-time (activation status)',
  })
  bannedAt?: Date;

  @Column({ type: 'smallint', nullable: true, comment: 'Average test score' })
  rating: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE, nullable: false, comment: 'User role' })
  role: UserRole;

  @ManyToMany(() => ArticleEntity, article => article.finishedBy)
  @JoinTable()
  finishedArticles: Promise<Array<ArticleEntity>>;

  @ManyToMany(() => FinishedTest, test => test.finishedBy)
  @JoinTable()
  finishedTests: Promise<Array<FinishedTest>>;
}
