import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateAuctionDto {
  @ApiProperty({
    example: 'Rolex watch',
  })
  @IsString()
  @IsNotEmpty({ message: 'item name is required' })
  itemName: string;

  @ApiProperty({
    example: 'This is the item description',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'item description is required' })
  description: string;

  @ApiProperty({
    example: '200',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'start price is required' })
  startPrice: number;

  @ApiProperty({
    example: '400',
  })
  @IsNumber()
  @IsOptional()
  currentPrice?: number;

  @ApiProperty({
    example: '2016-06-22 19:10:25-07',
  })
  @IsString()
  @IsNotEmpty({ message: 'Due date is required' })
  dueDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
