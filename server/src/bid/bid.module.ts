import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiddingItems } from './entities/bid.entity';
import { Auction } from '@/auction/entities/auction.entity';
import { Users } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiddingItems, Auction, Users])],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
