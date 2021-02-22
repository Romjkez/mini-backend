import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { User } from '../user/user.entity';
import { Option } from '../option/option.entity';
import { Test } from '../test/test.entity';

@Entity()
export class FinishedTest {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: User, isArray: true })
  @ManyToMany(() => User, user => user.finishedTests)
  finishedBy: Array<User>;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  chosenOptions: Array<Option>;

  @ApiModelProperty({ type: Test })
  @ManyToOne(() => Test, test => test.id)
  test: Test;

  @ApiModelProperty()
  @Column({ type: 'float' })
  rate: number;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;
}
