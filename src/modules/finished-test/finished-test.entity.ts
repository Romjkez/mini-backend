import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserEntity } from '../user/user.entity';
import { Test } from '../test/test.entity';
import { UserAnswer } from '../user-answer/user-answer.entity';

@Entity({ name: 'finishedTest' })
export class FinishedTest {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: UserEntity, isArray: true })
  @ManyToMany(() => UserEntity, async user => user.finishedTests)
  finishedBy: Promise<Array<UserEntity>>;

  @ApiModelProperty({ type: UserAnswer, isArray: true })
  @OneToMany(() => UserAnswer, answer => answer.finishedTest, { cascade: true })
  answers: Array<UserAnswer>;

  @ApiModelProperty({ type: Test })
  @ManyToOne(() => Test, test => test.id)
  test: Test;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp' })
  finishedAt: Date;

  @ApiModelProperty({ readOnly: true })
  @Column({ type: 'real' })
  result: number;
}
