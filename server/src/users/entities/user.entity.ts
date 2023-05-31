import { Auction } from '@/auction/entities/auction.entity';
import { BiddingItems } from '@/bid/entities/bid.entity';
import { Payment } from '@/payment/entities/payment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Payment, (payment) => payment.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  payment: Payment;

  @OneToMany(() => Auction, (auction) => auction.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  auction: Auction[];

  @OneToMany(() => BiddingItems, (bid) => bid.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bidItem: BiddingItems[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
