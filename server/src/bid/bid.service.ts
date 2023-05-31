import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BiddingItems } from './entities/bid.entity';
import { DataSource, Repository } from 'typeorm';
import { Auction } from '@/auction/entities/auction.entity';
import { Users } from '@/users/entities/user.entity';
import {
  DELETE_RECORD_RESPONSE,
  NOT_FOUND_RESPONSE,
} from '@/common/constants/http-responses.types';
import { Payment } from '@/payment/entities/payment.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(BiddingItems)
    private biddingRepo: Repository<BiddingItems>,
    @InjectRepository(Auction)
    private auctionRepo: Repository<Auction>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}

  async create(req: any, body: CreateBidDto): Promise<BiddingItems> {
    const queryRunner = this.dataSource.createQueryRunner();

    const { user } = req;

    const isUser = await this.userRepo.findOne({
      where: { id: user.id },
      relations: { payment: true },
      select: {
        id: true,
        email: true,
        userName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const isAuction = await this.auctionRepo.findOneBy({
      id: Number(body?.auctionId),
    });

    const isBid = await this.biddingRepo.findOne({
      where: {
        userId: {
          id: user.id,
        },
        auctionItems: {
          id: body?.auctionId,
        },
      },
    });

    if (!isUser?.payment)
      throw new HttpException(
        "You don't have any amount in your account",
        HttpStatus.BAD_REQUEST,
      );

    if (Number(isUser?.payment?.amount) < Number(body?.bidAmount)) {
      throw new HttpException(
        "You don't have much amount in your account",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(isUser?.payment?.amount) <= Number(isAuction?.currentPrice))
      throw new HttpException(
        "You don't have much amount in your account",
        HttpStatus.BAD_REQUEST,
      );

    if (!isAuction || !isUser)
      throw new HttpException(
        NOT_FOUND_RESPONSE.message,
        NOT_FOUND_RESPONSE.status,
      );

    if (isAuction?.startPrice >= body?.bidAmount)
      throw new HttpException(
        'Bidding price should be greater than the current price',
        HttpStatus.BAD_REQUEST,
      );

    if (isAuction?.currentPrice >= body?.bidAmount)
      throw new HttpException(
        'Bidding price should be greater than the current price',
        HttpStatus.BAD_REQUEST,
      );

    await queryRunner.startTransaction();

    try {
      if (isBid) {
        await queryRunner.manager.update(BiddingItems, Number(isBid?.id), {
          bidAmount: body?.bidAmount,
        });

        await queryRunner.manager.update(Auction, Number(body?.auctionId), {
          currentPrice: body?.bidAmount,
        });
        // await queryRunner.manager.update(Payment, isUser?.payment?.id, {
        //   amount: Number(isUser?.payment?.amount) - Number(body?.bidAmount),
        // });
        await queryRunner.commitTransaction();

        const bid = await this.biddingRepo.findOneBy({ id: Number(isBid?.id) });

        return bid;
      }

      const createBid = queryRunner.manager.create(BiddingItems, {
        bidAmount: body?.bidAmount,
        auctionItems: isAuction,
        userId: isUser,
      });

      const saveBid = await queryRunner.manager.save(createBid);

      await queryRunner.manager.update(Auction, Number(body?.auctionId), {
        currentPrice: body?.bidAmount,
      });

      // await queryRunner.manager.update(Payment, isUser?.payment?.id, {
      //   amount: Number(isUser?.payment?.amount) - Number(body?.bidAmount),
      // });

      await queryRunner.commitTransaction();

      const bid = await this.biddingRepo.findOneBy({ id: saveBid?.id });

      return bid;
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error?.response?.body?.errors[0]?.message || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(req: any): Promise<BiddingItems[]> {
    const { user } = req;
    const bids = await this.biddingRepo.find({
      where: {
        userId: {
          id: user.id,
        },
      },
      relations: {
        auctionItems: true,
      },
      select: {
        auctionItems: {
          id: true,
          itemName: true,
          startPrice: true,
          currentPrice: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
    return bids;
  }

  async findOne(id: number, req: any): Promise<BiddingItems> {
    const { user } = req;
    const bid = await this.biddingRepo.findOne({
      where: {
        id: id,
        userId: {
          id: user.id,
        },
      },
    });
    if (!bid)
      throw new HttpException(
        NOT_FOUND_RESPONSE.message,
        NOT_FOUND_RESPONSE.status,
      );
    return bid;
  }

  async remove(id: number, req: any): Promise<unknown> {
    const { user } = req;
    const bid = await this.biddingRepo.findOne({
      where: {
        id: id,
        userId: {
          id: user.id,
        },
      },
    });

    if (!bid)
      throw new HttpException(
        NOT_FOUND_RESPONSE.message,
        NOT_FOUND_RESPONSE.status,
      );

    const removeBid = await this.biddingRepo.delete(id);

    if (removeBid?.affected)
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
