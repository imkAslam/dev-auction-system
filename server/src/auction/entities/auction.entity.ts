import { BiddingItems } from '@/bid/entities/bid.entity';
import { Users } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auction_items')
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'numeric' })
  startPrice: number;

  @Column({ type: 'numeric', nullable: true })
  currentPrice: number;

  @Column({ type: 'timestamp without time zone' })
  dueDate: string;

  @ManyToOne(() => Users, (user) => user.auction, { onDelete: 'CASCADE' })
  user: Users;

  @OneToMany(() => BiddingItems, (bid) => bid.auctionItems, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bid: BiddingItems;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
