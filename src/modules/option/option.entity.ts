import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity({ name: 'option' })
export class Option {
  @ApiModelProperty({
    type: 'integer',
    minimum: 1,
    example: 1,
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelPropertyOptional({
    nullable: true,
    example: 'https://i.imgur.com/oygcF4w.jpeg',
  })
  @Column({ type: 'varchar', nullable: true })
  url?: string;

  @ApiModelPropertyOptional({ nullable: true, example: 1 })
  @Column({
    type: 'smallint',
    unsigned: true,
    nullable: true,
    comment: 'Identifier of option for ordering inside order questions',
  })
  order?: number;
}
