import { Auction } from '@/auction/entities/auction.entity';
import { Users } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bidding_items')
export class BiddingItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  bidAmount: number;

  @Column({ nullable: true })
  winnerId: number;

  @ManyToOne(() => Auction, (auction) => auction.bid, {
    onDelete: 'CASCADE',
  })
  auctionItems: Auction;

  @ManyToOne(() => Users, (user) => user.bidItem, {
    onDelete: 'CASCADE',
  })
  userId: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
