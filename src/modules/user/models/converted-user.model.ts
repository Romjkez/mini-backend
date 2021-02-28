import { SimpleUser } from './simple-user.model';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, CreateDateColumn, JoinTable, ManyToMany, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from '../../article/article.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';

/**
 * User with converted Articles and Tests relations
 */
export class ConvertedUser extends SimpleUser {
  @ApiModelProperty()
  id: number;

  @Exclude({ toPlainOnly: true })
  @ApiModelProperty()
  @Column({ type: 'varchar', comment: 'User password' })
  password: string;

  @ApiModelProperty()
  @Column({ length: 50, type: 'varchar', comment: 'First name' })
  firstName: string;

  @ApiModelPropertyOptional()
  @Column({ length: 50, type: 'varchar', comment: 'Last name' })
  lastName: string;

  @ApiModelProperty()
  @Column({ length: 100, type: 'varchar', comment: 'Email', unique: true })
  email: string;

  @ApiModelProperty()
  @Column({ type: 'varchar', nullable: true, comment: 'Employer company' })
  company?: string;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp', comment: 'Account creation date' })
  createdAt: Date;

  @ApiModelProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    comment: 'Last account update',
  })
  updatedAt?: Date;

  @ApiModelProperty()
  @Column({
    type: 'boolean',
    default: false,
    comment: 'If user prefers to hide profile from users rating',
  })
  isPrivate: boolean;

  @ApiModelProperty()
  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Account ban date-time',
  })
  bannedAt?: Date;

  @ApiModelProperty()
  @Column({ type: 'smallint', nullable: true, comment: 'Average test score' })
  rating: number;

  @ApiModelProperty({ type: Article, isArray: true })
  @ManyToMany(() => Article, article => article.finishedBy)
  @JoinTable()
  finishedArticles: Promise<Array<Article>>;

  @ApiModelProperty({ type: FinishedTest, isArray: true })
  @ManyToMany(() => FinishedTest, test => test.finishedBy)
  @JoinTable()
  finishedTests: Promise<Array<FinishedTest>>;
}
