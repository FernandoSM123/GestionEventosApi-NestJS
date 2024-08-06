import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('active_tokens')
export class ActiveToken {
  @PrimaryGeneratedColumn({ name: 'active_token_id' })
  id: number;

  @Column()
  userId: number;

  @Column({ unique: true })
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}
