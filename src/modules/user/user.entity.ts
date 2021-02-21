import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Article } from '../article/article.entity';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { FinishedTest } from '../finished-test/finished-test.entity';

@Entity()
export class User {
    @ApiModelProperty()
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ApiModelProperty()
    @Column({ length: 50, type: 'varchar' })
    firstName: string;

    @ApiModelPropertyOptional()
    @Column({ length: 50, type: 'varchar', nullable: true })
    lastName?: string;

    @ApiModelProperty()
    @Column({ length: 100, type: 'varchar' })
    email: string;

    @ApiModelProperty({ readOnly: true })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @ApiModelProperty()
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: number;

    @ApiModelProperty()
    @Column({ type: 'boolean', default: false })
    isPrivate: boolean;

    @ApiModelProperty()
    @Column({ type: 'tinyint', nullable: true })
    rating: number;

    @ApiModelProperty({ type: Article, isArray: true })
    @ManyToMany(() => Article, article => article.finishedBy)
    finishedArticles: Array<Article>;

    @ApiModelProperty({ type: FinishedTest, isArray: true })
    @ManyToMany(() => FinishedTest, test => test.finishedBy)
    finishedTests: Array<FinishedTest>;
}
