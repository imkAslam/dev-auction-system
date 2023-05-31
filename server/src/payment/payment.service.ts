import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '@/users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { NOT_FOUND_RESPONSE } from '@/common/constants/http-responses.types';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async create(req: any, body: CreatePaymentDto): Promise<unknown> {
    const { user } = req;
    const isUser = await this.userRepo.findOne({
      where: { id: user.id },
      relations: {
        payment: true,
      },
    });

    if (!isUser)
      throw new HttpException(
        NOT_FOUND_RESPONSE.message,
        NOT_FOUND_RESPONSE.status,
      );

    try {
      if (!isUser?.payment) {
        const addPayment = this.paymentRepo.create({
          ...body,
          userId: isUser,
        });
        await this.paymentRepo.save(addPayment);
        return {
          message: 'Payment added successfully',
          statusCode: HttpStatus.OK,
          data: [],
        };
      }

      const updatePayment = await this.paymentRepo.update(isUser?.payment?.id, {
        amount: Number(isUser?.payment?.amount) + body?.amount,
      });
      if (updatePayment?.affected)
        return {
          message: 'Payment added successfully',
          statusCode: HttpStatus.OK,
          data: [],
        };

      return {
        message: 'Operation failed',
        statusCode: HttpStatus.NO_CONTENT,
        data: [],
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPayment(req: any): Promise<Payment> {
    const { user } = req;
    const myPayment = await this.paymentRepo.findOne({
      where: {
        userId: {
          id: user.id,
        },
      },
    });

    // if (!myPayment)
    //   throw new HttpException(
    //     "You don't have any payment in your account",
    //     NOT_FOUND_RESPONSE.status,
    //   );

    return myPayment;
  }
}
