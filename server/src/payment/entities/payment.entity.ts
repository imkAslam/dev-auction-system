import { Users } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  amount: number;

  @OneToOne(() => Users, (user) => user.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userId: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
