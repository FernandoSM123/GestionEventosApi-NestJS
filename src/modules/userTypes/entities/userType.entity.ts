import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('user_types')
export class UserType {
  @PrimaryGeneratedColumn({ name: 'user_type_id' })
  id: number;

  @Column({ name: 'user_type_name', type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}
