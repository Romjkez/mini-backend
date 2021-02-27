import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from '../article/article.entity';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { FinishedTest } from '../finished-test/finished-test.entity';
import { SimpleUser } from './models/simple-user.model';

@Entity()
export class User extends SimpleUser {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true, comment: 'Unique identifier' })
  id: number;

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
  @Column({ length: 100, type: 'varchar', comment: 'Email' })
  email: string;

  @ApiModelProperty()
  @Column({type: 'varchar', nullable: true, comment: 'Employer company' })
  company?: string;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp', comment: 'Account creation date' })
  createdAt: Date;

  @ApiModelProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: true, comment: 'Last account update' })
  updatedAt?: Date;

  @ApiModelProperty()
  @Column({ type: 'boolean', default: false, comment: 'If user prefers to hide profile from users rating' })
  isPrivate: boolean;

  @ApiModelProperty()
  @Column({type: 'timestamp', nullable: true, comment: 'Account ban date-time'})
  bannedAt?: Date;

  @ApiModelProperty()
  @Column({ type: 'smallint', nullable: true, comment: 'Average test score' })
  rating: number;

  @ApiModelProperty({ type: Article, isArray: true })
  @ManyToMany(() => Article, article => article.finishedBy)
  finishedArticles: Array<Article>;

  @ApiModelProperty({ type: FinishedTest, isArray: true })
  @ManyToMany(() => FinishedTest, test => test.finishedBy)
  finishedTests: Array<FinishedTest>;
}
