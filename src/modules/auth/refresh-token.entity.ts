import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('refreshTokens')
export class RefreshToken {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', unique: true })
  refreshToken: string;

  @ManyToOne(() => UserEntity, user => user.id, { eager: true })
  owner: UserEntity;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
