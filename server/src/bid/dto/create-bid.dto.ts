import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'auction id required' })
  auctionId: number;

  @ApiProperty({
    example: '200',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'start price is required' })
  bidAmount: number;
}
