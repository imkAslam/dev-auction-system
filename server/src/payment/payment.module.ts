import { Users } from '@/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Users])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
