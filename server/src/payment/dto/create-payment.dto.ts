import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: '400',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'amount is required' })
  amount: number;
}
