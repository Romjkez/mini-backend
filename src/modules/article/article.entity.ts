import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity({ name: 'article' })
export class ArticleEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty()
  @Column({ length: 150, type: 'varchar' })
  title: string;

  @ApiModelProperty()
  @Column({ type: 'text' })
  content: string;

  @ApiModelProperty()
  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  @ApiModelProperty({ type: 'integer', default: 0 })
  @Column({ type: 'int', default: 0 })
  finishedCount: number;

  @ApiModelProperty({ type: UserEntity, isArray: true })
  @ManyToMany(() => UserEntity, async user => user.finishedArticles)
  finishedBy: Array<UserEntity>;

  @ApiModelPropertyOptional({ example: 'https://avtotachki.com/wp-content/uploads/2020/12/37.jpg' })
  @Column({ type: 'varchar', default: null, nullable: true })
  previewUrl?: string;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @ApiModelProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: number;
}
