import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { Users } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Users])],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
