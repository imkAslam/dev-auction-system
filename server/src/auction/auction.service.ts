import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { Users } from '@/users/entities/user.entity';
import {
  DELETE_RECORD_RESPONSE,
  NOT_FOUND_RESPONSE,
} from '@/common/constants/http-responses.types';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @InjectRepository(Auction)
    private readonly auctionRepo: Repository<Auction>,
  ) {}

  async create(req: any, body: CreateAuctionDto): Promise<Auction> {
    const { user } = req;
    const isUser = await this.userRepo.findOne({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        userName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const newAuction = this.auctionRepo.create({ ...body, user: isUser });
    const saveAuction = await this.auctionRepo.save(newAuction);
    return saveAuction;
  }

  async findAll(): Promise<Auction[]> {
    const auctions = await this.auctionRepo.find();
    return auctions;
  }

  async findOne(id: number): Promise<Auction> {
    const auction = await this.auctionRepo.findOneBy({ id: id });
    if (!auction)
      throw new HttpException(
        NOT_FOUND_RESPONSE.message,
        NOT_FOUND_RESPONSE.status,
      );
    return auction;
  }

  async update(id: number, body: UpdateAuctionDto): Promise<unknown> {
    const auction = await this.auctionRepo.findOneBy({ id: id });
    const updateAuction = this.auctionRepo.merge(auction, body);
    const saveAuction = await this.auctionRepo.save(updateAuction);
    return saveAuction;
  }

  async remove(id: number): Promise<unknown> {
    const isAuction = await this.auctionRepo.findOneBy({ id: id });

    if (!isAuction)
      throw new HttpException(
        NOT_FOUND_RESPONSE.message,
        NOT_FOUND_RESPONSE.status,
      );

    const auction = await this.auctionRepo.delete(id);
    if (auction?.affected)
      return {
        message: DELETE_RECORD_RESPONSE.message,
        statusCode: DELETE_RECORD_RESPONSE.status,
        data: [],
      };

    return {
      message: 'Operation failed',
      statusCode: HttpStatus.NO_CONTENT,
      data: [],
    };
  }
}
